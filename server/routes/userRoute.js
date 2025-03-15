const router=require('express').Router();
const userCtrl=require('../controllers/userCtrl')

const auth=require('../middlewares/auth');
// register

router.post('/register',userCtrl.registerUser)

// login
router.post('/login', userCtrl.loginUser)

// verify
router.get('/verify',auth , userCtrl.verifiedToken)


module.exports=router;