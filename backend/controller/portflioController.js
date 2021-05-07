const axios = require('axios')

const User = require('./../models/userModel');
const Certificate = require('./../models/CertificateModels');
const Education = require('./../models/educationModel');
const Experience = require('./../models/experienceModels');
const Project = require('./../models/projectModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

exports.getBasicDetails = catchAsync(async (req, res, next) => {
  const userDoc = await User.find({
    username: req.params.username,
  });
  if (!userDoc) {
    return next(
      new AppError('no such username exist! Enter correct username', 404)
    );
  }

  return res.status(200).json({
    status: 'success',
    data: userDoc,
  });
});

exports.getEducationDetails = catchAsync(async (req, res, next) => {
  const userDoc = await User.find({
    username: req.params.username,
  });
  const userID = userDoc._id;

  if (!userDoc) {
    return next(
      new AppError('no such username exist! Enter correct username', 404)
    );
  }

  const education = await Education.find({
    user: userID,
  });

  return res.status(200).json({
    status: 'success',
    education: education,
  });
});

exports.getExperienceDetails = catchAsync(async (req, res, next) => {
  const userDoc = await User.find({
    username: req.params.username,
  });
  const userID = userDoc._id;

  if (!userDoc) {
    return next(
      new AppError('no such username exist! Enter correct username', 404)
    );
  }

  const experience = await Experience.find({
    user: userID,
  });

  return res.status(200).json({
    status: 'success',
    experience: experience,
  });
});

exports.getProjectDetails = catchAsync(async (req, res, next) => {
  const userDoc = await User.find({
    username: req.params.username,
  });
  const userID = userDoc._id;

  if (!userDoc) {
    return next(
      new AppError('no such username exist! Enter correct username', 404)
    );
  }

  const project = await Project.find({
    user: userID,
    included: true,
  });

  return res.status(200).json({
    status: 'success',
    project: project,
  });
});

exports.getCertificate = catchAsync(async (req, res, next) => {
  const userDoc = await User.find({
    username: req.params.username,
  });
  const userID = userDoc._id;

  if (!userDoc) {
    return next(
      new AppError('no such username exist! Enter correct username', 404)
    );
  }

  return res.status(200).json({
    status: 'success',
    certificate: certificate,
  });
});

exports.getDetailsByUsername = catchAsync(async (req, res, next) => {
  const userDoc = await User.find({
    usernamee: req.params.username,
  });
  const userID = userDoc._id;
  const education = await Education.find({
    user: userID,
  });
  const certificate = await Certificate.find({
    user: userID,
  });
  const experience = await Experience.find({
    user: userID,
  });
  const project = await Project.find({
    user: userID,
    included: true,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      user: userDoc,
      education: education,
      certificate: certificate,
      experience: experience,
      project: project,
    },
  });
});