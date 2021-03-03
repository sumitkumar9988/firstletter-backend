const User = require('./../models/userModel');
const Project=require('./../models/projectModel')
const Education=require('./../models/educationModel')
const Experience=require('./../models/experienceModels')
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');


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


exports.updateUserDetail=catchAsync(async(req,res,next)=>{

  const filteredBody = filterObj(req.body, 'name', 'email','photo','bio','skills','location','lookingForJob');

  const updatedUser =await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
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
  const user = await User.findByIdAndUpdate(req.user.id,{ active: false });
 
  res.status(200).json({
    status: 'success',
    data:null
  });
});


exports.getEducationDetail=catchAsync(async(req,res,next)=>{

  const user=await User.findById(req.user.id).populate('education');
  res.status(201).json({
    status:'success',
    data:{
      education:user.education
    }
  })
})

exports.addEducation=catchAsync(async(req,res,next)=>{


  const education=req.body;
  console.log(education)
  const educationDoc=await Education.create(education);

  const user=await User.findById(req.user.id);
  console.log(educationDoc._id);
  user.education.unshift(educationDoc._id);
  await user.save();

  res.status(200).json({
    status:'success',
    message:'education update successful'
  })

})

exports.deleteEducationDetail=catchAsync(async(req,res,next)=>{

  // const user=await User.findById(req.user.id);
  // user.education.s

})

exports.updateEducation=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})




exports.getExperienceDetail=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })


})

exports.addExperience=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})

exports.deleteExperienceDetail=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})

exports.updateExperience=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})

exports.updateBasicDetails=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})


exports.updateSocialNetworking=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})

