const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const educationSchema = new mongoose.Schema({
  institute: {
    type: String,
  },basicinfo: String,
  degree: String,
  startDate: Number,
  endDate: Number,
  grade: String,
  activitiesAndSocieties: String,
});

const workExperienceSchema = new mongoose.Schema({
  jobTitle: String,
  organization: String,
  startDate: String,
  endDate: String,
  duration: Number,
  responsibilities:String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
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
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  skills: {
    type: [String],
    required: true
  },
  location: {
    type: String
  },
  
  bio: {
    type: String,
    minlength: 10,
    maxlength: 100,
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
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  project:{
    type:mongoose.Schema.ObjectId,  
    ref:'Project'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  lookingForJob:{
    type:Boolean,
    default:true
  },
  accountCreateAt:{
    type:Date,
    default:Date.now()
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
 
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
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
