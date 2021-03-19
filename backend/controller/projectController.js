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

  const setGitHubUserName = {
    gitHubAccount: response.data.login
  }
  console.log(setGitHubUserName);

  if (!response.data.login) {
    return next(new AppError('Some error occurred while GitHub OAuth', 404));
  }

  const user = await User.findByIdAndUpdate(req.user.id, setGitHubUserName, {
    new: true,
    runValidators: true
  })
  res.status(201).json({
    status: 'success',
    redirect: '/success',
    data: {
      user: response.data
    }
  })
})



exports.getAllUserProject = catchAsync(async (req, res, next) => {

  // const user=await User.findById(req.user.id);
  // if(!user.gitHubAccount){
  //     return next(new AppError('Please provide your GitHub account', 404));
  // }
  // console.log(user.gitHubAccount);
  githubUserName = 'sumitkumar9988';
  const {
    data
  } = await axios.get(`https://api.github.com/users/${githubUserName}/repos`);
  let projects = data.map((item, index) => {
    return {
      user: 'sumit',
      name: item.name,
      repoID: item.id,
      repoUrl: item.url,
      license: item.license,
      DemoUrl: item.html_url,
      updated_at: item.updated_at,
      description: item.description,
    }
  })


  console.log(projects);


  letCurrentProject = [{
      "user": "sumit",
      "name": "appintrowithlottie",
      "repoID": 211465032,
      "repoUrl": "https://api.github.com/repos/sumitkumar9988/appintrowithlottie",
      "license": null,
      "DemoUrl": "https://github.com/sumitkumar9988/appintrowithlottie",
      "updated_at": "2019-11-15T06:40:09Z",
      "description": "app intro slide with lottie in android "
    },
    {
      "user": "sumit",
      "name": "natours",
      "repoID": 302821241,
      "repoUrl": "https://api.github.com/repos/sumitkumar9988/natours",
      "license": null,
      "DemoUrl": "https://github.com/sumitkumar9988/natours",
      "updated_at": "2020-10-10T05:24:17Z",
      "description": "landing page using sass"
    },
    {
      "user": "sumit",
      "name": "Artisto",
      "repoID": 320835703,
      "repoUrl": "https://api.github.com/repos/sumitkumar9988/Artisto",
      "license": null,
      "DemoUrl": "https://github.com/sumitkumar9988/Artisto",
      "updated_at": "2020-12-14T13:32:24Z",
      "description": null
    },
    {
      "user": "sumit",
      "name": "Authentication-using-jwt-in-node-js",
      "repoID": 243343746,
      "repoUrl": "https://api.github.com/repos/sumitkumar9988/Authentication-using-jwt-in-node-js",
      "license": null,
      "DemoUrl": "https://github.com/sumitkumar9988/Authentication-using-jwt-in-node-js",
      "updated_at": "2020-02-29T09:42:07Z",
      "description": "token based Authentication in node js ,mongo db "
    },
    {
      "user": "sumit",
      "name": "chat-app",
      "repoID": 302599311,
      "repoUrl": "https://api.github.com/repos/sumitkumar9988/chat-app",
      "license": null,
      "DemoUrl": "https://github.com/sumitkumar9988/chat-app",
      "updated_at": "2020-10-09T18:59:46Z",
      "description": null
    }
  ]


  const itemToInsertINtoDatabase = projects.filter((el) => {
    return !letCurrentProject.filter(item => {
      return item.repoID === el.repoID
    }).length
  });

  // !b.filter(y => y.id === i.id).length



  res.status('200').json({
    status: 'success',
    data: {
      itemToInsertINtoDatabase
    }
  })
})