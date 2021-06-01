const axios = require('axios')
const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

//API for codechef data

axios.defaults.timeout = 5000;

exports.saveCodeChefUserName = catchAsync(async (req, res, next) => {
    const username = req.body.codeChefUsername;
    if (!username) {
        return next(new AppError('Please Enter your CodeChef Username', 404));
    }
    try {

        const {
            data
        } = await axios.get(`${process.env.CP_API_BASE_LINK}/codechef/${username}`)
        if (data.status === 'Success') {
            const body = {
                codeChefAccount: username
            }
            const user = await User.findByIdAndUpdate(req.user.id, body, {
                new: true,
                runValidators: true
            })

            return res.status(201).json({
                status: 'success',
                message: 'CodeChef Username update Success'
            })

        }
        return next(new AppError('Please Enter valid CodeChef username', 404));

    } catch (error) {
        return next(new AppError('Something went wrong with Compitative programming API! Please try again later', 500));
    }

})

exports.getCodeChefData = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const codechefusername = user.codeChefAccount;
    if (!codechefusername) {
        return next(new AppError('Please enter CodeChef username'));
    }
    const {
        data
    } = await axios.get(`${process.env.CP_API_BASE_LINK}/codechef/${codechefusername}`)
    return res.status(201).json({
        status: 'success',
        data: {
            codeChef: data
        }
    })

})

//for spoj  account details

exports.saveSPOJUserName = catchAsync(async (req, res, next) => {
    const username = req.body.spojAccount;
    if (!username) {
        return next(new AppError('Please Enter your SPOJ Username', 404));
    }
    try {

        const {
            data
        } = await axios.get(`${process.env.CP_API_BASE_LINK}/spoj/${username}`)
        if (data.status === 'Success') {
            const body = {
                spojAccount: username
            }
            await User.findByIdAndUpdate(req.user.id, body, {
                runValidators: true
            })


            return res.status(201).json({
                status: 'success',
                message: 'SPOJ Username update Success'
            })

        }

        return next(new AppError(' Please Enter valid SPOJ username', 404));

    } catch (error) {
        return next(new AppError('Something went wrong with Compitative programming API! Please try again later', 500));
    }

})

//get SPOJ Details

exports.getSpojData = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const spojUsername = user.spojAccount;
    if (!spojUsername) {
        return next(new AppError('Please enter SPOJ username'));
    }
    const {
        data
    } = await axios.get(`${process.env.CP_API_BASE_LINK}/spoj/${spojUsername}`)
    return res.status(201).json({
        status: 'success',
        data: {
            SPOJ: data
        }
    })

})



//set your Codeforces  account details

exports.saveCodeForcesUserName = catchAsync(async (req, res, next) => {
    const username = req.body.codeforcesAccount;
    if (!username) {
        return next(new AppError('Please Enter your CodeForces Username', 404));
    }

      const body = {
                codeforcesAccount: username
            }
            await User.findByIdAndUpdate(req.user.id, body, {
                runValidators: true
            })


            return res.status(201).json({
                status: 'success',
                message: 'CodeForces Username update Success'
            })
})

//get your Codeforces profile Data Details

exports.getCodeforcesData = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const codeforces = user.codeforcesAccount;
    if (!codeforces) {
        return next(new AppError('Please enter Codeforces username'));
    }
    const { data } = await axios.get(`${process.env.CP_API_BASE_LINK}/codeforces/${codeforces}`)
    if(data.status==='Failed'){
        return next(new AppError("You don't have valid Codeforces username Please update "));
    }
    return res.status(201).json({
        status: 'success',
        data: {
            codeforces: data
        }
    })
})