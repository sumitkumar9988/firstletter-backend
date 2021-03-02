const User = require('./../models/userModel');
const Project=require('./../models/projectModel')
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

  const updatedUser =awaitUser.findByIdAndUpdate(req.user.id,filteredBody,{
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

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })


})

exports.addEducation=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

})

exports.deleteEducationDetail=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,'education');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

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

