const User = require('./../models/userModel');
const Education = require('./../models/educationModel');
const Experience = require('./../models/experienceModels');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Certificate = require('./../models/CertificateModels');
const service_account = require('../utils/key.json');
const { google } = require('googleapis');
var dateFormat = require('dateformat');
const { now } = require('mongoose');
const { findOne } = require('./../models/userModel');
const reporting = google.analyticsreporting('v4');
let scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
let jwt = new google.auth.JWT(
  service_account.client_email,
  null,
  service_account.private_key,
  scopes
);

let view_id = '244321056';

exports.uploadImage = catchAsync(async (req, res, next) => {
  const image = req.body.image;
  res.status(200).json({
    status: 'success',
    url: image,
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
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
  const filteredBody = filterObj(
    data,
    'email',
    'mobileNumber',
    'username',
    'twitterAcount',
    'facebookAccount',
    'linkedInAccount',
    'InstaAccount',
    'mediumAccount',
    'dribbleAccount',
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
    message: 'User details update successfully!',
  });
});

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
  const filteredBody = filterObj(
    req.body,
    'twitterAcount',
    'facebookAccount',
    'linkedInAccount',
    'InstaAccount',
    'gitHubAccount',
    'mediumAccount'
  );
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError('There is no such user with these id', 400));
  }

  res.status(200).json({
    status: 'success',
    message: 'Users Details update successfully!',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  if (!user) {
    return next(new AppError('There is no such user with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: 'Account Deactivate! You can login your account whenever you want ',
  });
});

exports.getEducationDetail = catchAsync(async (req, res, next) => {
  const education = await Education.findById(req.params.id);
  if (!education) {
    return next(new AppError('No document found with that ID', 400));
  }
  res.status(201).json({
    status: 'success',
    data: {
      education: education,
    },
  });
});

exports.getAllEducation = catchAsync(async (req, res, next) => {
  const education = await Education.find({
    user: req.user.id,
  });
  res.status(201).json({
    status: 'success',
    length: education.length,
    data: {
      education: education,
    },
  });
});

exports.addEducation = catchAsync(async (req, res, next) => {
  const education = {
    institute: req.body.institute,
    user: req.user.id,
    basicinfo: req.body.basicinfo,
    instituteLogo: req.body.image,
    city: req.body.city,
    degree: req.body.degree,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    grade: req.body.grade,
    activitiesAndSocieties: req.body.activitiesAndSocieties,
  };

  await Education.create(education);

  res.status(200).json({
    status: 'success',
    message: 'new education add successful',
  });
});

exports.deleteEducationDetail = catchAsync(async (req, res, next) => {
  const educationDoc = await Education.findByIdAndDelete(req.params.id);
  if (!educationDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Item delete successfully',
  });
});

exports.updateEducation = catchAsync(async (req, res, next) => {
  data = req.body;

  const education = await Education.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!education) {
    return next(new AppError('No document found with that ID', 400));
  }
  res.status(201).json({
    status: 'success',
    message: 'Education update successfully',
  });
});

exports.allUserExeprience = catchAsync(async (req, res, next) => {
  const experience = await Experience.find({
    user: req.user.id,
  });
  res.status(201).json({
    status: 'success',
    length: experience.length,
    data: {
      experience,
    },
  });
});

exports.getExperienceById = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    return next(new AppError('No such data availabe with this ID', 400));
  }
  res.status(201).json({
    status: 'success',
    data: {
      experience,
    },
  });
});

exports.addExperience = catchAsync(async (req, res, next) => {
  const experience = {
    jobTitle: req.body.jobTitle,
    user: req.user.id,
    organization: req.body.organization,
    organizationLogo: req.body.image,
    website: req.body.website,
    remote: req.body.remote,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    city: req.body.city,
    duration: req.body.duration,
    responsibilities: req.body.responsibilities,
  };
  await Experience.create(experience);

  return res.status(200).json({
    status: 'success',
    message: 'new experience add successfully ',
  });
});

exports.deleteExperienceDetail = catchAsync(async (req, res, next) => {
  const experienceDoc = await Experience.findByIdAndDelete(req.params.id);
  if (!experienceDoc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Item delete successfully',
  });
});

exports.updateExperience = catchAsync(async (req, res, next) => {
  data = req.body;

  const experience = await Experience.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!experience) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    message: 'Experience details update successfully',
  });
});

exports.addCertificate = catchAsync(async (req, res, next) => {
  const certificateData = {
    user: req.user.id,
    name: req.body.name,
    image: req.body.image,
    isseueDate: req.body.isseueDate,
    Organization: req.body.Organization,
    learning: req.body.learning,
    url: req.body.url,
  };
  await Certificate.create(certificateData);
  res.status(200).json({
    status: 'success',
    message: 'New Certificate add successfully',
  });
});

exports.getYourCertificate = catchAsync(async (req, res, next) => {
  const certificate = await Certificate.find({
    user: req.user.id,
  });

  res.status(200).json({
    status: 'success',
    length: certificate.length,
    data: {
      certificate,
    },
  });
});

exports.getCertificateByID = catchAsync(async (req, res, next) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    next(new AppError('No certificate found By this id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      certificate,
    },
  });
});

exports.deleteCertificate = catchAsync(async (req, res, next) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'item delete successfully',
  });
});

exports.uploadLinkedInResume = catchAsync(async (req, res, next) => {
  return res.status(205).json({
    status: 'success',
    message:
      'this API is still in development stage !wait till this goes to production',
  });
});

exports.addSkills = catchAsync(async (req, res, next) => {
  const skill = req.body.skill;
  const user = await User.findById(req.user.id);
  user.skills.push(skill);
  await user.save();
  // console.log(user);
  return res.status(205).json({
    status: 'success',
    message: 'Skills add successfully',
  });
});

exports.removeSkills = catchAsync(async (req, res, next) => {
  return res.status(205).json({
    status: 'success',
    message:
      'this API is still in development stage !wait till this goes to production',
  });
});

exports.getAnalticsData = catchAsync(async (req, res, next) => {
  const total_days = req.body.total_days || 90;
  const today_date = dateFormat(new Date(), 'yyyy-mm-dd');
  const milli_second_in_days = 86400000;
  let last_date;

  if (total_days === 7) {
    last_date = new Date(new Date() - 7 * milli_second_in_days);
  } else if (total_days === 30) {
    last_date = new Date(new Date() - 30 * milli_second_in_days);
  } else {
    last_date = new Date(new Date() - 90 * milli_second_in_days);
  }
  
  let allDate=gernateDate(last_date,new Date())
  console.log(allDate)
  last_date = dateFormat(last_date, 'yyyy-mm-dd');

  let metrics_report = {
    reportRequests: [
      {
        viewId: view_id,
        dateRanges: [{ startDate: last_date, endDate: today_date }],
        metrics: [{ expression: 'ga:pageviews' }],
        dimensions: [{ name: 'ga:date' }, { name: 'ga:pagePath' }],
        dimensionFilterClauses: [
          {
            filters: [
              {
                operator: 'EXACT',
                dimensionName: 'ga:pagePath',
                expressions: ['sumit.firstletter.tech/'],
              },
            ],
          },
        ],
      },
    ],
  };

  try {
    await jwt.authorize();
    let request = {
      headers: { 'Content-Type': 'application/json' },
      auth: jwt,
      resource: metrics_report,
    };

    const { data } = await reporting.reports.batchGet(request);
    const rowData = data.reports[0].data.rows;
    const totalData = data.reports[0].data.totals;
    const filterData=filterAnalticsData(rowData);

    // filter between allDate and filterData
    
    Object.keys(allDate).forEach(function(key) {
      if(filterData[key]){
        allDate[key] = filterData[key];
      }
      // if (item[key] == null || item[key] == 0) {
      //   item[key] = results[key];
      // }
    })

    console.log(allDate)
    //  const datewithFormat= changeDateFormat('20210708');
    res.status(201).json({
      status: 'sucess',
      data:filterData,
      totalUser: totalData[0].values[0],
    });
  } catch (error) {
    return next(new AppError(error.message, 404));
  }
});

const filterAnalticsData = (data => {
  
  let filterdata={}
  for ( var index=0; index<data.length; index++ ) {
    let date=data[index].dimensions[0]
    date=changeDateFormat(date)
    const value=data[index].metrics[0].values[0];
    filterdata[date]=value;
}
return filterdata;


});
// funky date format from google analtics 20210708 YYYYMMDD cahnge to DD-MM-YYYY
const changeDateFormat = (funkyDateFormat) => {
  const year = funkyDateFormat.slice(0, 4);
  const month = funkyDateFormat.slice(4, 6);
  const day = funkyDateFormat.slice(6, 8);
  const format = year + '-' + month + '-' + day;
  return format;
};

const gernateDate=(startDate,endDate)=>{
  const milli_second_in_days = 86400000;
  let start=new Date(startDate)
  let end=new Date(endDate)
  let dt;

  let data={}
  while (start<=end) {
    start = new Date(start.getTime() +  milli_second_in_days); 
    dt=dateFormat(start,'yyyy-mm-dd');
    data[dt]=0;    
  }
  return data;
}
