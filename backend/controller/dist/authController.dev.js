"use strict";

var jwt = require('jsonwebtoken');

var crypto = require('crypto');

var AppError = require('./../utils/AppError');

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

var Email = require('./../utils/email');

var signInToke = function signInToke(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

var createSendToken = function createSendToken(user, statusCode, res) {
  var token = signInToke(user._id);
  var visibalData = {
    photo: user.photo,
    role: user.role,
    name: user.name,
    email: user.email,
    id: user._id
  };
  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: visibalData
    }
  });
};

exports.signUp = catchAsync(function _callee(req, res, next) {
  var newUser, url;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }));

        case 2:
          newUser = _context.sent;
          url = "https://firstletter.tech/";
          _context.next = 6;
          return regeneratorRuntime.awrap(new Email(newUser, url).sendWelcome());

        case 6:
          createSendToken(newUser, 201, res);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = catchAsync(function _callee2(req, res, next) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Please provide email and password!', 400)));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 10:
          _context2.t0 = !_context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Incorrect email or password', 401)));

        case 13:
          createSendToken(user, 200, res);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.protect = catchAsync(function _callee3(req, res, next) {
  var token, decoded, currentUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // 1) Getting token and check of it's there
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
          }

          if (token) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", next(new AppError('You are not logged in! Please log in to get access.', 401)));

        case 3:
          // 2) Verification token
          decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // 3) Check if user still exists

          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 6:
          currentUser = _context3.sent;

          if (currentUser) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", next(new AppError('The user belonging to this token does no longer exist.', 401)));

        case 9:
          if (!currentUser.changedPasswordAfter(decoded.iat)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", next(new AppError('User recently changed password! Please log in again.', 401)));

        case 11:
          // GRANT ACCESS TO PROTECTED ROUTE
          req.user = currentUser;
          res.locals.user = currentUser;
          next();

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.forgotPassword = catchAsync(function _callee4(req, res, next) {
  var user, resetToken, resetURL;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context4.sent;

          if (user) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new AppError('There is no user with email address.', 404)));

        case 5:
          // 2) Generate the random reset token
          resetToken = user.createPasswordResetToken();
          _context4.next = 8;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 8:
          _context4.prev = 8;
          resetURL = "http://firstletter.tech/resetPassword/".concat(resetToken);
          _context4.next = 12;
          return regeneratorRuntime.awrap(new Email(user, resetURL).sendPasswordReset());

        case 12:
          res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
          });
          _context4.next = 22;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](8);
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          _context4.next = 21;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 21:
          return _context4.abrupt("return", next(new AppError('There was an error sending the email. Try again later!'), 500));

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[8, 15]]);
});
exports.resetPassword = catchAsync(function _callee5(req, res, next) {
  var hashedToken, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // 1) Get user based on the token
          hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
              $gt: Date.now()
            }
          }));

        case 3:
          user = _context5.sent;

          if (user) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", next(new AppError('Token is invalid or has expired', 400)));

        case 6:
          user.password = req.body.password;
          user.passwordConfirm = req.body.passwordConfirm;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          // 3) Update changedPasswordAt property for the user
          // 4) Log the user in, send JWT
          createSendToken(user, 200, res);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updatePassword = catchAsync(function _callee6(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('+password'));

        case 2:
          user = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(user.correctPassword(req.body.passwordCurrent, user.password));

        case 5:
          if (_context6.sent) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", next(new AppError('Your current password is wrong.', 401)));

        case 7:
          user.password = req.body.password;
          _context6.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          createSendToken(user, 200, res);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.checkUsernameAvailablty = catchAsync(function _callee7(req, res, error) {
  var username;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          username = User.findOne({
            username: req.body.username
          });

          if (!username) {
            res.status(200).json({
              status: 'success',
              message: 'username is available!'
            });
          } else {
            res.status(401).json({
              status: 'fail',
              message: 'username is already taken'
            });
          }

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.updateUsername = catchAsync(function _callee8(req, res, next) {
  var newUsername, body, updateUsernameDetails;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          newUsername = req.body.username;

          if (newUsername) {
            _context8.next = 3;
            break;
          }

          return _context8.abrupt("return", next(new AppError("username can't be empty", 404)));

        case 3:
          body = {
            username: newUsername
          };
          _context8.next = 6;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, body, {
            "new": true,
            runValidators: true
          }));

        case 6:
          updateUsernameDetails = _context8.sent;
          return _context8.abrupt("return", res.status(200).json({
            status: 'success',
            message: "your username has been change to ".concat(updateUsernameDetails.newUsername)
          }));

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
});