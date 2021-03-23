const express = require('express');
const portflioController = require('./../controller/portflioController');
const router = express.Router();

router.get('/profile/:username',portflioController.getDetailsByUsername);

module.exports = router;
