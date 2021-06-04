const express = require('express');
const portflioController = require('./../controller/portflioController');
const router = express.Router();


router.get('/profile/:username',portflioController.getUsername, portflioController.getBasicDetails);
router.get('/profile/:username/all',portflioController.getUsername, portflioController.getAllDetails);

router.get(
  '/profile/:username/education',
  portflioController.getUsername, portflioController.getEducationDetails
);

router.get(
  '/profile/:username/experience',
  portflioController.getUsername, portflioController.getExperienceDetails
);

router.get('/profile/:username/project', portflioController.getUsername,portflioController.getProjectDetails);
router.get('/profile/:username/certificate', portflioController.getUsername,portflioController.getCertificate);


module.exports = router;
