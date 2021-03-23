const User = require('./../models/userModel');
const Education = require('./../models/educationModel')
const Experience = require('./../models/experienceModels')
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Certificate = require('./../models/CertificateModels');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.userDetail = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUserDetail = catchAsync(async (req, res, next) => {

  data = req.body;
  if (req.result) {
    data.photo = req.result.url;
  }
  console.log(data)
  const filteredBody = filterObj(data, 'email', 'name', 'photo', 'bio', 'skills', 'location', 'lookingForJob');
  console.log(filteredBody);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    active: false
  });

  res.status(200).json({
    status: 'success',
    data: null
  });
});

exports.getEducationDetail = catchAsync(async (req, res, next) => {
  const education = await Education.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    length: education.size,
    data: {
      education: education
    }
  })
})

exports.getAllEducation = catchAsync(async (req, res, next) => {
  const education = await Education.find({
    user: req.user.id
  });
  res.status(201).json({
    status: 'success',
    length: education.length,
    data: {
      education: education
    }
  })
})

exports.addEducation = catchAsync(async (req, res, next) => {

  let logo;
  if (!req.result) {
    logo = 'defauult.jpg';
  } else {
    logo = req.result.url;
  }

  const education = {
    institute: req.body.institute,
    user: req.user.id,
    basicinfo: req.body.basicinfo,
    instituteLogo: logo,
    degree: req.body.degree,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    grade: req.body.grade,
    activitiesAndSocieties: req.body.activitiesAndSocieties,
  };

  const educationDoc = await Education.create(education);

  res.status(200).json({
    status: 'success',
    message: 'education update successful'
  })

})

exports.deleteEducationDetail = catchAsync(async (req, res, next) => {
  const educationDoc = await Education.findByIdAndDelete(req.params.id);
  if (!educationDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'item delete successfully'
  })
})

exports.updateEducation = catchAsync(async (req, res, next) => {

  data = req.body;
  if (req.result) {
    data.instituteLogo = req.result.url;
  }

  const education = await Education.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  })

  if (!education) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success'
  })

})

exports.allUserExeprience = catchAsync(async (req, res, next) => {

  const experience = await Experience.find({
    user: req.user.id
  });
  res.status(201).json({
    status: 'success',
    length: experience.size,
    data: {
      experience
    }
  })

})

exports.getExperienceById = catchAsync(async (req, res, next) => {

  const experience = await Experience.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      experience
    }
  })

})

exports.addExperience = catchAsync(async (req, res, next) => {

  let logo;
  if (!req.result) {
    logo = 'default.jpg';
  } else {
    logo = req.result.url;
  }
  const experience = {
    jobTitle: req.body.jobTitle,
    user: req.user.id,
    organization: req.body.organization,
    organizationLogo: logo,
    website: req.body.website,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    duration: req.body.duration,
    responsibilities: req.body.responsibilities,
  };
  const experienceDoc = await Experience.create(experience);

  res.status(200).json({
    status: 'success',
    data: {
      experience: experienceDoc
    }
  })

})

exports.deleteExperienceDetail = catchAsync(async (req, res, next) => {

  const experienceDoc = await Experience.findByIdAndDelete(req.params.id);
  if (!experienceDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'item delete successfully'
  })

})

exports.updateExperience = catchAsync(async (req, res, next) => {

  data = req.body;
  if (req.result) {
    data.organizationLogo = req.result.url;
  }

  const experience = await Experience.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  })

  if (!experience) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success'
  })

})

exports.updateBasicDetails = catchAsync(async (req, res, next) => {

  const userData = {
    username: req.body.username,
    profession: req.body.profession,
    bio: req.body.bio,
  }

  if (!req.body.username) {
    return next(new AppError('username is required', 404));
  }

  const checkUsername = User.findOne({
    username: req.body.username,
  });
console.log(checkUsername);

  if (checkUsername) {
    return next(new AppError('Chooose another username', 404));
  }

  const user = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true
  })
  res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  })

})


exports.updateSocialNetworking = catchAsync(async (req, res, next) => {

  console.log(req.body);
  const filteredBody = filterObj(req.body,
    'twitterAcount', 'facebookAccount', 'linkedInAccount',
    'InstaAccount', 'codeChefAccount', 'spojAccount', 'mediumAccount');
    console.log(filteredBody);
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  })

})


exports.addCertificate = catchAsync(async (req, res, next) => {
  const certificateData = {
    user: req.user.id,
    name: req.body.name,
    image: req.result.url,
    isseueDate: req.body.isseueDate,
    Organization: req.body.Organization,
    url: req.body.url,
  };
  const certificate = await Certificate.create(certificateData);
  console.log(certificate);
  res.status(200).json({
    status: 'success'
  })
})

exports.getYourCertificate = catchAsync(async (req, res, next) => {
  const certificate = await Certificate.find({
    user: req.user.id
  });

  res.status(200).json({
    status: 'success',
    length: certificate.length,
    data: {
      certificate
    }
  })
})

exports.getCertificateByID = catchAsync(async (req, res, next)=>{

  const certificate = await Certificate.findById(req.params.id);
  if(!certificate){
    next(new AppError('No certificate found By this id',404));
  }
  res.status(200).json({
    status:'success',
    data:{
      certificate,
    }
  })
})

exports.deleteCertificate = catchAsync(async (req, res, next)=>{
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'item delete successfully'
  })
})