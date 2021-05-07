const express = require('express');
const portflioController = require('./../controller/portflioController');
const router = express.Router();

router.get('/profile/:username',portflioController.getDetailsByUsername);
router.get('/profile/:username/basic', portflioController.getBasicDetails);
router.get(
  '/profile/:username/education',
  portflioController.getEducationDetails
);
router.get(
  '/profile/:username/experience',
  portflioController.getExperienceDetails
);
router.get('/profile/:username/project', portflioController.getProjectDetails);
router.get('/profile/:username/certificate', portflioController.getCertificate);


module.exports = router;
