const axios =require('axios')
const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

exports.saveCodeChefUserName=catchAsync(async (req, res, next) => {
    const username =req.body.codeChefUsername;
    if(!username){
        return next(new AppError('Please Enter your CodeChef Username', 404));
    }
    try{
        const {data}=await axios.get(`${process.env.CP_API_BASE_LINK}/codeforces/${username}`)

        // const {data}=await axios.get(`${process.env.CP_API_BASE_LINK}/codechef/${username}`)
        if(data.status==='Success'){
            const body={
                codeChefAccount:username
            }
            // const user = await User.findByIdAndUpdate(req.user.id, body, {
            //     new: true,
            //     runValidators: true
            //   })
            
            console.log(data)
              return res.status(201).json({
                  status:'success',
                  message:'CodeChef Username update Success'
              })

        }
        res.status(404).json(data);
        // return next(new AppError(' Please Enter valid CodeChef username', 404));

    }catch(error){
        return next(new AppError('002 Please Enter valid CodeChef username', 404));
    }
    
})

exports.getCodeChefData=catchAsync(async (req, res, next) => {
    const user=await User.findById(req.params.id);
    console.log()
    const codechefusername=user.codeChefAccount;
    if(!codechefusername){
        return next(new AppError('Please enter CodeChef username'));
    }
 
})

