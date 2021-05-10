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
      user
    },
  });
});

exports.updateUserDetail = catchAsync(async (req, res, next) => {

  data = req.body;
  if (req.result) {
    data.photo = req.result.url;
  }
  const filteredBody = filterObj(
    data,
    'email',
    'mobileNumber',
    'name',
    'photo',
    'bio',
    'skills',
    'location',
    'profession',
    'lookingForJob',
    'intrestedIn',
    'gender'
  );
  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message:'User details update successfully!'
  });
})


exports.updateusername = catchAsync(async (req, res, next) => {
  const userData = {
    username: req.body.username,
  };

  if (!req.body.username) {
    return next(new AppError('username is required', 404));
  }

  await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'Users Details update sucessfull!',
  });
});


exports.updateSocialNetworking = catchAsync(async (req, res, next) => {

  const filteredBody = filterObj(req.body,
    'twitterAcount', 'facebookAccount', 'linkedInAccount',
    'InstaAccount', 'gitHubAccount', 'mediumAccount');
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })
  if(!user){
    return next(new AppError('There is no such user with these id', 400));
  }

  res.status(200).json({
    status: 'success',
    message:'Users Details update successfully!'
  })

})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    active: false
  });
  if(!user){
    return next(new AppError('There is no such user with this id',404))
  }

  res.status(200).json({
    status: 'success',
    data: 'Account Deactivate! You can login your account whenever you want '
  });
});

exports.getEducationDetail = catchAsync(async (req, res, next) => {
  const education = await Education.findById(req.params.id);
  if(!education){
    return next(new AppError('No document found with that ID', 400));
  }
  res.status(201).json({
    status: 'success',
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
    logo = 'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/university.png';
  } else {
    logo = req.result.url;
  }

  const education = {
    institute: req.body.institute,
    user: req.user.id,
    basicinfo: req.body.basicinfo,
    instituteLogo: logo,
    city: req.user.city,
    degree: req.body.degree,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    grade: req.body.grade,
    activitiesAndSocieties: req.body.activitiesAndSocieties,
  };

   await Education.create(education);

  res.status(200).json({
    status: 'success',
    message: 'new education add successful'
  })

})

exports.deleteEducationDetail = catchAsync(async (req, res, next) => {
  const educationDoc = await Education.findByIdAndDelete(req.params.id);
  if (!educationDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Item delete successfully'
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
    return next(new AppError('No document found with that ID', 400));
  }
  res.status(201).json({
    status: 'success',
    message:'Education update successfully'
  })

})

exports.allUserExeprience = catchAsync(async (req, res, next) => {

  const experience = await Experience.find({
    user: req.user.id
  });
  res.status(201).json({
    status: 'success',
    length: experience.length,
    data: {
      experience
    }
  })

})

exports.getExperienceById = catchAsync(async (req, res, next) => {

  const experience = await Experience.findById(req.params.id);
  if(!experience){
    return next(new AppError('No such data availabe with this ID',400))
  }
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
    logo = 'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/company.png';
  } else {
    logo = req.result.url;
  }
  const experience = {
    jobTitle: req.body.jobTitle,
    user: req.user.id,
    organization: req.body.organization,
    organizationLogo: logo,
    website: req.body.website,
    remote: req.user.remote,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    city:  req.body.city,
    duration: req.body.duration,
    responsibilities: req.body.responsibilities,
  };
   await Experience.create(experience);

 return res.status(200).json({
    status: 'success',
    message:'new experience add successfully '
  })

})

exports.deleteExperienceDetail = catchAsync(async (req, res, next) => {

  const experienceDoc = await Experience.findByIdAndDelete(req.params.id);
  if (!experienceDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Item delete successfully'
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
    status: 'success',
    message:'Experience details update successfully'
  })

})




exports.addCertificate = catchAsync(async (req, res, next) => {

  let uploadImage;
  if (req.result) {
    uploadImage = req.result.url;
  }
  if (!uploadImage) {
    return next(new AppError('Upload Your Certificate', 401));
  }
  const certificateData = {
    user: req.user.id,
    name: req.body.name,
    image: uploadImage,
    isseueDate: req.body.isseueDate,
    Organization: req.body.Organization,
    url: req.body.url,
  };
   await Certificate.create(certificateData);
  res.status(200).json({
    status: 'success',
    message:'New Certificate add successfully'
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


exports.uploadLinkedInResume = catchAsync(async (req, res, next) => {

  return res.status(205).json({
    status:'success',
    message:'this API is still in development stage !wait till this goes to production'
  })
  
});