"use strict";

var express = require('express');

var portflioController = require('./../controller/portflioController');

var router = express.Router();
router.get('/profile/:username', portflioController.getDetailsByUsername);
module.exports = router;