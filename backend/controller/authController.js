const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');
const request = require('request');

const signInToke = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signInToke(user._id);
  const visibalData = {
    photo: user.photo,
    role: user.role,
    name: user.name,
    email: user.email,
    id: user._id,
  };
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: visibalData,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const url = `https://firstletter.tech/`;
  await new Email(newUser, url).sendWelcome();

  //add email to list

  // var options = {
  //   method: 'PUT',
  //   url: 'https://api.sendgrid.com/v3/marketing/contacts',
  //   headers: {
  //     'content-type': 'application/json',
  //     authorization:
  //       'Bearer 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',
  //   },
  //   body: {
  //     list_ids: ['956575b3-93e1-4b79-b0f4-bafeb6af003f'],
  //     contacts: [
  //       {
  //         email: `${newUser.email}`,
  //         first_name: `${newUser.name}`,
  //       },
  //     ],
  //   },
  //   json: true,
  // };

  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //   console.log(body);
  // });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  try {
    const resetURL = `http://firstletter.tech/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }

 
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;

  await user.save();

  createSendToken(user, 200, res);
});

exports.checkUsernameAvailablty = catchAsync(async (req, res, error) => {
  const username = User.findOne({
    username: req.body.username,
  });

  if (!username) {
    res.status(200).json({
      status: 'success',
      message: 'username is available!',
    });
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'username is already taken',
    });
  }
});

exports.updateUsername = catchAsync(async (req, res, next) => {
  const newUsername = req.body.username;
  if (!newUsername) {
    return next(new AppError("username can't be empty", 404));
  }
  const body = {
    username: newUsername,
  };
  const updateUsernameDetails = await User.findByIdAndUpdate(
    req.user.id,
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: 'success',
    message: `your username has been change to ${updateUsernameDetails.newUsername}`,
  });
});
