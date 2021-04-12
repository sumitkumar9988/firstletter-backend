"use strict";

var Email = require('./../utils/email');

var AppError = require('./../utils/AppError');

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

var nodemailer = require('nodemailer');

var sendEmail = function sendEmail(options) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 1) Create a transporter
          transporter = nodemailer.createTransport({
            host: process.env.SENDGRID_HOST,
            port: process.env.SENDGRID_PORT,
            auth: {
              user: process.env.SENDGRID_USERNAME,
              pass: process.env.SENDGRID_API_KEY_PASSWORD
            }
          }); // 2) Define the email options

          mailOptions = {
            from: 'sumit@firstletter.tech',
            to: 'sumitranga50@gmail.com',
            subject: 'testing testing',
            text: 'testing testing' // html:

          }; // 3) Actually send the email

          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.testEmailWorking = catchAsync(function _callee(req, res, next) {
  var option;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          option = {};
          _context2.next = 4;
          return regeneratorRuntime.awrap(sendEmail(option));

        case 4:
          res.status(200).json({
            status: 'success'
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(404).json({
            status: 'error',
            error: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});