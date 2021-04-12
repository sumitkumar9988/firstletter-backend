"use strict";

var express = require('express');

var authController = require('./../controller/authController');

var userController = require('./../controller/userController');

var projectController = require('./../controller/projectController');

var cpController = require('./../controller/compitativeProgrammingController'); // const multer = require('./../utils/multer');
// const uploadPdf=require('./../utils/uploadPdf');


var test = require('./../utils/emailTest');

var uploadImageToS3 = require('./../utils/UploadImagetoAWS');

var router = express.Router();
router.post('/signup', authController.signUp); //testing done

router.post('/login', authController.login); //testing done

router.post('/forgetpassword', authController.forgotPassword); // testing done

router.post('/resetpassword/:token', authController.resetPassword); //testing done

router.post('/changepassword', authController.protect, authController.updatePassword); //testing done

router.route('/').get(authController.protect, userController.userDetail) //testing done
.patch(authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3, userController.updateUserDetail) //testing done
["delete"](authController.protect, userController.deleteUser); //testing done

router.patch('/username', authController.protect, userController.updateusername);
router.patch('/social', authController.protect, userController.updateSocialNetworking);
router.get('/education', authController.protect, userController.getAllEducation); //testing done

router.post('/education', authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3, userController.addEducation); //testing done

router["delete"]('/education/:id', authController.protect, userController.deleteEducationDetail); //testing done

router.get('/education/:id', authController.protect, userController.getEducationDetail); //testing done

router.patch('/education/:id', authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3, userController.updateEducation); //testing done

router.get('/experience', authController.protect, userController.allUserExeprience); //testing done

router.post('/experience', authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3, userController.addExperience); //testing done

router.get('/experience/:id', authController.protect, userController.getExperienceById); //testing done

router["delete"]('/experience/:id', authController.protect, userController.deleteExperienceDetail); //testing done

router.patch('/experience/:id', authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3, userController.updateExperience); //testing done

router.get('/githubauth', authController.protect, projectController.guthubOAoth);
router.get('/github/callback', projectController.githubCallBack);
router.post('/setGithubUserName', authController.protect, projectController.setGitHubUserName);
router.get('/project', authController.protect, projectController.getAllUserProject);
router.get('/project/:id', authController.protect, projectController.getProjectDetails);
router.patch('/project/:id', authController.protect, projectController.updateProjectDetails);
router.route('/certificate').get(authController.protect, userController.getYourCertificate).post(authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3, userController.addCertificate); //testing done

router.get('/certificate/:id', authController.protect, userController.getCertificateByID); //testing done

router["delete"]('/certificate/:id', authController.protect, userController.deleteCertificate); //testing done

router.post('/uploadresume', authController.protect, userController.uploadLinkedInResume);
router.post('/codechef', authController.protect, cpController.saveCodeChefUserName); //testing done

router.get('/codechef', authController.protect, cpController.getCodeChefData); //testing done

router.post('/spoj', authController.protect, cpController.saveSPOJUserName); //testing done

router.get('/spoj', authController.protect, cpController.getSpojData); //testing done

router.post('/codeforces', authController.protect, cpController.saveCodeForcesUserName); //testing done

router.get('/codeforces', authController.protect, cpController.getCodeforcesData); //testing done

router.post('/testemail', test.testEmailWorking); //testing done

router.post('/uploadtoaws', authController.protect, uploadImageToS3.uploadUserPhoto, uploadImageToS3.uploadImageToS3); //testing done

module.exports = router;