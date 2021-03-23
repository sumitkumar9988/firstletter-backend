const axios = require('axios')

const User = require('./../models/userModel');
const Certificate = require('./../models/CertificateModels');
const Education = require('./../models/educationModel');
const Experience = require('./../models/experienceModels');
const Project = require('./../models/projectModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');

exports.getDetailsByUsername = catchAsync(async (req, res, next) => {

    const userDoc = await User.find({
        usernamee: req.params.username
    });
    const userID = userDoc._id;
    const education = await Education.find({
        user: userID
    });
    const certificate = await Certificate.find({
        user: userID
    });
    const experience = await Experience.find({
        user: userID
    });
    const project = await Project.find({
        user: userID,
        included: true
    });

    return res.status(200).json({
        status: 'success',
        data: {
            user: userDoc,
            education: education,
            certificate: certificate,
            experience: experience,
            project: project,
        }

    })
})