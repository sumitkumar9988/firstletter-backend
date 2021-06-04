const User = require('./../models/userModel');
const Certificate = require('./../models/CertificateModels');
const Education = require('./../models/educationModel');
const Experience = require('./../models/experienceModels');
const Project = require('./../models/projectModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

exports.getBasicDetails = catchAsync(async (req, res, next) => {

   res.status(200).json({
    status: 'success',
    user: req.user,
  });
});


exports.getUsername = catchAsync(async (req, res, next) => {
  const userDoc = await User.findOne({
    username: req.params.username,
  });

  if (!userDoc) {
    return next(
      new AppError('no such username exist! Enter correct username', 404)
    );
  }
else{
  req.user=userDoc;
  next();
}
  
});


exports.getEducationDetails = catchAsync(async (req, res, next) => {
 
  const userId=req.user._id;
  const education = await Education.find({
    user:userId ,
  });
  const experience =await Experience.find({
    user:userId ,
  })

  return res.status(200).json({
    status: 'success',
    education: education,
  });
  
});


exports.getExperienceDetails = catchAsync(async (req, res, next) => {
 
  const userId=req.user._id;

  const experience =await Experience.find({
    user:userId ,
  })

  return res.status(200).json({
    status: 'success',
    experience:experience
  });
  
});




exports.getProjectDetails = catchAsync(async (req, res, next) => {
 
  const userId=req.user._id;
  const project = await Project.find({
    user: userId,
    included: true,
  });

  return res.status(200).json({
    status: 'success',
    project: project,
  });
});

exports.getCertificate = catchAsync(async (req, res, next) => {

  const userId=req.user._id;

  const certificate =await Certificate.find({
    user:userId ,
  })
  return res.status(200).json({
    status: 'success',
    certificate: certificate,
  });
});

