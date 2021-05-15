const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 12,
      unique: true,
      required: [true, "user name can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'username is invalid'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    profession: {
      type: String,
      enum: ['developer', 'designer'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },

    photo: {
      type: String,
      default:
        'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/user.png',
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    skills: {
      type: [String],
    },
    location: {
      type: String,
    },

    bio: {
      type: String,
      minlength: [10, 'bio should have atleast 10 words'],
      maxlength: [100, 'length of bio should not be greater than 100 words'],
    },
    intrestedIn: {
      type: String,
    },

    twitterAcount: { type: String },
    facebookAccount: { type: String },
    linkedInAccount: { type: String },
    InstaAccount: { type: String },
    codeChefAccount: { type: String },
    gitHubAccount: { type: String },
    spojAccount: { type: String },
    mediumAccount: { type: String },
    dribbleAccount: { type: String },
    codeforcesAccount: { type: String },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    lookingForJob: {
      type: Boolean,
      default: true,
    },
    accountCreateAt: {
      type: Date,
      default: Date.now(),
    },
    mobileNumber: {
      type: Number,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



userSchema.pre('save', async function (next) {
 
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
