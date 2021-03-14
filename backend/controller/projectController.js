const Project=require('./../models/projectModel');
const User=require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const axios =require('axios')

exports.guthubOAoth = catchAsync(async(req,res,next)=>{
    res.status('200').json({
        status: 'success',
        redirect:`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    })
})


exports.githubCallBack=catchAsync(async(req,res,next)=>{
   
    const requestToken=req.query.code;
    const {data}=await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET_KEY}&code=${requestToken}`)
    let access_token=data.split('&')[0];
    access_token=access_token.split('=')[1];
    console.log('accesstoken',access_token)    

    const response=await axios.get(`https://api.github.com/user`, {headers:{
        Authorization: 'token ' + access_token
      }})
    
    const setGitHubUserName={
        gitHubAccount:response.data.login
    }
    console.log(setGitHubUserName);
    
    res.status(201).json({
        status:'success',
        redirect:'/success',
        data:{
           user: response.data}
    })


})




