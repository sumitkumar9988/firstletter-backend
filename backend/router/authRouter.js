const express = require('express');
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');
const projectController=require('./../controller/projectController');
const cloudinary = require('./../utils/cloudinary');
const multer = require('./../utils/multer');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgetpassword', authController.forgotPassword);
router.post('/resetpassword/:token', authController.resetPassword);
router.post(
  '/changepassword',
  authController.protect,
  authController.updatePassword
);
router
    .route('/')
    .get(authController.protect, userController.userDetail)
    .patch(authController.protect,userController.updateUserDetail)
    .delete(authController.protect,userController.deleteUser);

router.get('/education',authController.protect,userController.getEducationDetail)  
router.post('/education',authController.protect,userController.addEducation)
router.delete('/education/:id',authController.protect,userController.deleteEducationDetail)
router.patch('/education/:id',authController.protect,userController.updateEducation)


router.get('/experience',authController.protect,userController.getExperienceDetail)  
router.post('/experience',authController.protect,userController.addExperience)
router.delete('/experience/:id',authController.protect,userController.deleteExperienceDetail)
router.patch('/experience/:id',authController.protect,userController.updateExperience)

router.patch('/basic',authController.protect,userController.updateBasicDetails)
router.patch('/social',authController.protect,userController.updateSocialNetworking)


router.get('/githubauth',authController.protect,projectController.guthubOAoth);
router.get('/github/callback',authController.protect,projectController.githubCallBack);

router.route('/certificate')
      .get(authController.protect,userController.getYourCertificate)
      .post(authController.protect,multer.uploadUserPhoto,
        multer.uploadImagetoCloudinary,userController.addCertificate);

//     
module.exports = router;
