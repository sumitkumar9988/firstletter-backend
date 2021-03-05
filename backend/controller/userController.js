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
    length:user.education.size,
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

  
    const educationDoc= await Education.findByIdAndDelete(req.params.id);
    if(!educationDoc){
      return next(new AppError('No document found with that ID', 404));
    }
  res.status(200).json({
    status:'success',
    message:'item delete successfully'
  })
})

exports.updateEducation=catchAsync(async(req,res,next)=>{

 
  const education=await Education.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })

  if(!education){
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
      status:'success'   
  })

})




exports.getExperienceDetail=catchAsync(async(req,res,next)=>{

  const user=await User.findById(req.user.id).populate('experience');
  res.status(201).json({
    status:'success',
    data:{
      experience:user.experience
    }
  })

})

exports.addExperience=catchAsync(async(req,res,next)=>{

  const experience=req.body;

  const experienceDoc=await Experience.create(experience);

  const user=await User.findById(req.user.id);
  console.log(experienceDoc._id);
  user.education.unshift(experienceDoc._id);
  await user.save();

  res.status(200).json({
    status:'success',
    message:'experience update successful'
  })

})

exports.deleteExperienceDetail=catchAsync(async(req,res,next)=>{

  const experienceDoc= await Experience.findByIdAndDelete(req.params.id);
  if(!experienceDoc){
    return next(new AppError('No document found with that ID', 404));
  }
res.status(200).json({
  status:'success',
  message:'item delete successfully'
})

})

exports.updateExperience=catchAsync(async(req,res,next)=>{

  const education=await Education.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })

  if(!education){
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
      status:'success'   
  })

})

exports.updateBasicDetails=catchAsync(async(req,res,next)=>{

  const userData={
    username: req.body.username,
    profession:req.body.profession,
    bio: req.body.bio,
  }
  
  if(!req.body.username){
    return next(new AppError('username is required', 404));
  }

  const checkUsername = User.findOne({
    username: req.body.username,
  });

  if(checkUsername){
    return next(new AppError('Chooose another username', 404));
  }

  const user =await User.findByIdAndUpdate(req.user.id,userData,{
    new:true,
    runValidators:true
  })
    res.status(200).json({
      status: 'success',
      data:{ 
        user:user
      }
    })

})


exports.updateSocialNetworking=catchAsync(async(req,res,next)=>{

  const filteredBody=filterObj(req.body,
    'twitterAcount','facebookAccount','linkedInAccount',
    'InstaAccount','codeChefAccount','spojAccount','mediumAccount');
  const user=await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new:true,
    runValidators:true
  })

  res.status(200).json({
    status: 'success',
    data:{ 
      user:user
    }
  })

})

