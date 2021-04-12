const Email = require('./../utils/email');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SENDGRID_HOST,
    port: process.env.SENDGRID_PORT,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_API_KEY_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'sumit@firstletter.tech',
    to: 'sumitranga50@gmail.com',
    subject: 'testing testing',
    text: 'testing testing',
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

exports.testEmailWorking = catchAsync(async (req, res, next) => {
  try {
    const option = {};
    await sendEmail(option);

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error', error });
  }
});
