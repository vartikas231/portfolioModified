const educationSchema=require('../middlewares/models/educationModel')


// ...........get about user.............
exports.getEducation = async (req, res) => {
  // first way
  const education = await educationSchema.find();
  res.json(education);

  // second way
  // aboutSchema.find()
  // .then(about=>res.json(about))
  // .catch(err=>res.status(500).json(`error:${err}`))

  // third way
  // try {
  //   res.json(about);

  // } catch (error) {
  //   err=>res.status(500).json(`error:${err}`)
  // }
};

// ...........add about user.............
exports.addEducation = async (req, res) => {
  const { education } = req.body;

  // first way
  try {
    const newEducation = new educationSchema({
      education: req.body.education,
    });

    await newEducation.save();
    res.json(newEducation);
  } catch (error) {
    res.status(500).json({ msg: `server problem` });
  }

  // second way using promises
  // const newAbout=new aboutSchema({
  //   about
  // })

  // newAbout.save()
  // .then(about=>res.json('the article was sended'))
  // .catch(err=>res.status(500).json(`error:${err}`))
};








// ...........get about specific user.............
exports.getEducationId = async (req, res) => {
  // one way

  try {
    const education = await educationSchema.findById(req.params.id);
    res.json(education);
  } catch (error) {
    res.status(500).json({ msg: `server issue` });
  }

  // one way
  // const about=await aboutSchema.findById(req.params.id);
  // res.json(about);

  // first way
  // aboutSchema.findById(req.params.id)
  // .then(about=>res.json(about))
  // .catch(err=>res.status(400).json({msg:err}))
};








// ...........update education specific user.............
exports.updateEducation = async (req, res) => {
  // oneway
   const { education } = req.body;
  try {
   
    const newEducation = await educationSchema.findByIdAndUpdate(req.params.id, {
      education,
    });
    let results = await newEducation.save();
    await results;
    res.json({ msg: "Education updated" });
  } catch (error) {
    res.status(500).json({ msg: `server issue` });
  }
};






// ...........delete specific user.............
exports.delEducation = async (req, res) => {
  const education = await educationSchema.findByIdAndDelete(req.params.id);

  res.json({ msg: "education deleted" });
};
