const userSchema=require('../middlewares/models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth=require('../middlewares/auth')
const {use} =require('../routes/userRoute')


// you can use different methods to create a function this is just a new style to learn

const userCtrl = {
  // register
  registerUser: async (req, res) => {
  try {
      const { username, email, password } = req.body;

      const user = await userSchema.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      // create big password and then update schema
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new userSchema({
        username: username,
        email: email,
        password: passwordHash,
      })

      await newUser.save();
      res.json({ msg: "registeration sucessful" });
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
  },
  // login user
  loginUser:async (req, res) => {
    try {
        const {email,password}=req.body;
        const user=await userSchema.findOne({email:email})
        if(!user){
            return res.status(400).json({msg:'user does not exists'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        // if(!isMatch){
        //     return res.status(400).json({msg:"incorrect password"})
        // }

        // if login is successful



        const payload={
            id:user._id,
            name:user.username
        }

        // if (process.env.SECRET_KEY !== "undefined") {
        //   console.log("It is set!");
        // } else {
        //   console.log("No set!");
        // }

        const token = jwt.sign(
          {
            id: user._id,
            name: user.username,
          },
          process.env.SECRET_KEY,
          { expiresIn: "50000000000000h" }
        );
        res.json({token})



    }
     catch (err) {
        return res.status(500).json({msg:err.message})
    }
  },





  
  // verify user
  verifiedToken:  (req, res) => {
    try {
      const token=req.header("Authorization")
      if(!token) return res.send(false)


      jwt.verify(token,process.env.SECRET_KEY, async(err,verified)=>{
        if(err)return res.send(false)
        const user=await userSchema.findById(verified.id)

        if(!user)return res.send(false)
        return res.send(true)

      })
    
    
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};


module.exports=userCtrl;