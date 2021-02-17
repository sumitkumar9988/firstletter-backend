const express=require('express')
const authController=require('./../controller/authController');

const router=express.Router();
router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.post('/forgetpassword',authController.forgotPassword);
router.post('/resetpassword/:token',authController.resetPassword);
router.post('/changepassword',authController.protect,authController.updatePassword);








module.exports=router;