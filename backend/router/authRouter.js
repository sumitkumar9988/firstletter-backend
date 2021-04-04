const express = require('express');
const authController = require('./../controller/authController');
const userController = require('./../controller/userController');
const projectController = require('./../controller/projectController');
const cpController=require('./../controller/compitativeProgrammingController')
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
router.post('/changeUsername', authController.protect)
router
  .route('/')
  .get(authController.protect, userController.userDetail)
  .patch(authController.protect, multer.uploadUserPhoto,
    multer.uploadImagetoCloudinary, userController.updateUserDetail)
  .delete(authController.protect, userController.deleteUser);

router.get('/education', authController.protect, userController.getAllEducation)
router.post('/education', authController.protect, multer.uploadUserPhoto,
  multer.uploadImagetoCloudinary, userController.addEducation)
router.delete('/education/:id', authController.protect, userController.deleteEducationDetail)
router.get('/education/:id', authController.protect, userController.getEducationDetail)
router.patch('/education/:id', authController.protect,
  multer.uploadUserPhoto,
  multer.uploadImagetoCloudinary, userController.updateEducation)


router.get('/experience', authController.protect, userController.allUserExeprience)
router.post('/experience', authController.protect, multer.uploadUserPhoto,
  multer.uploadImagetoCloudinary, userController.addExperience)
router.get('/experience/:id', authController.protect, userController.getExperienceById)
router.delete('/experience/:id', authController.protect, userController.deleteExperienceDetail)
router.patch('/experience/:id', authController.protect, multer.uploadUserPhoto,
  multer.uploadImagetoCloudinary, userController.updateExperience)

router.patch('/basic', authController.protect, userController.updateBasicDetails)
router.patch('/social', authController.protect, userController.updateSocialNetworking)


router.get('/githubauth', authController.protect, projectController.guthubOAoth);
router.get('/github/callback', projectController.githubCallBack);
router.post('/setGithubUserName', authController.protect, projectController.setGitHubUserName);

router.route('/certificate')
  .get(authController.protect, userController.getYourCertificate)
  .post(authController.protect, multer.uploadUserPhoto,
    multer.uploadImagetoCloudinary, userController.addCertificate);
router.get('/certificate/:id', authController.protect, userController.getCertificateByID)
router.delete('/certificate/:id', authController.protect, userController.deleteCertificate);

router.get('/project', authController.protect, projectController.getAllUserProject);
router.get('/project/:id', authController.protect, projectController.getProjectDetails);
router.patch('/project/:id', authController.protect, projectController.updateProjectDetails);

router.post('/uploadLinkedInResume',authController.protect,userController.uploadLinkedInResume);
// router.post('/codechef',authController.protect,cpController.saveCodeChefUserName)
 router.post('/codechef',cpController.saveCodeChefUserName)



module.exports = router;