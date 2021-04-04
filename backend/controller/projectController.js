const Project = require('./../models/projectModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const axios = require('axios')

exports.guthubOAoth = catchAsync(async (req, res, next) => {
  res.status('200').json({
    status: 'success',
    redirect: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  })
})


exports.githubCallBack = catchAsync(async (req, res, next) => {

  const requestToken = req.query.code;
  const {
    data
  } = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET_KEY}&code=${requestToken}`)
  let access_token = data.split('&')[0];
  access_token = access_token.split('=')[1];
  console.log('accesstoken', access_token)

  const response = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: 'token ' + access_token
    }
  })



  if (!response.data.login) {
    return next(new AppError('Some error occurred while GitHub OAuth', 404));
  }

  res.status(201).json({
    status: 'success',
    redirect: '/success',
    data: {
      username: response.data.login,
      name: response.data.name
    }
  })
})

exports.setGitHubUserName = catchAsync(async (req, res, next) => {

  if (!req.body.githubUserName) {
    return next(new AppError('Please Authorize GitHub again'));
  }
  githubUserName = {
    gitHubAccount: req.body.githubUserName
  }
  const user = await User.findByIdAndUpdate(req.user.id, githubUserName, {
    new: true,
    runValidators: true
  })
  res.status(201).json({
    status: 'success',
    message: 'Github username save'
  })
})

exports.getAllUserProject = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  if (!user.gitHubAccount) {
    return next(new AppError('Please provide your GitHub account', 404));
  }
  console.log(user.gitHubAccount);

  const {
    data
  } = await axios.get(`https://api.github.com/users/${user.gitHubAccount}/repos`);
  let projects = data.map((item, index) => {
    return {
      user: req.user.id,
      name: item.name,
      repoID: item.id,
      repoUrl: item.url,
      DemoUrl: item.html_url,
      updated_at: item.updated_at,
      description: item.description,
    }
  })

  const currentProject = await Project.find({
    user: req.user.id
  });
  console.log(currentProject)


  const itemToInsertINtoDatabase = projects.filter((el) => {
    return !currentProject.filter(item => {
      return item.repoID === el.repoID
    }).length
  });
  console.log("itemToInsertINtoDatabase", itemToInsertINtoDatabase);
  // !b.filter(y => y.id === i.id).length

  //create multiple documents
  await Project.insertMany(itemToInsertINtoDatabase);
  const allProject = await Project.find({
    user: req.user.id
  });

  res.status('200').json({
    status: 'success',
    length: allProject.length,
    data: {
      projects: allProject
    }
  })
})

exports.getProjectDetails = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError('Project Details Not Found', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      project: project
    }
  })
})

exports.updateProjectDetails = catchAsync(async (req, res, next) => {
  data = req.body;
  if (req.result) {
    data.projectLogo = req.result.url;
  }

  const project = await Project.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  })

  if(!project) {
    return next(new AppError('Project not found By id',404));
  }
  return res.status(200).json({
    status: 'success',
    message: 'Project Details Update Successully',
    data:{
      project: project
    }
  })

})



