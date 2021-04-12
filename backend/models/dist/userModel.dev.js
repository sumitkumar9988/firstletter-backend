"use strict";

var crypto = require('crypto');

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  username: {
    type: String,
    lowercase: true,
    minlength: 3,
    maxlength: 12,
    unique: true,
    required: [true, 'Please enter username']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  profession: {
    type: String,
    "enum": ['developer', 'designer']
  },
  photo: {
    type: String,
    "default": 'default.jpg'
  },
  role: {
    type: String,
    "enum": ['user', 'admin'],
    "default": 'user'
  },
  skills: {
    type: [String]
  },
  location: {
    type: String
  },
  bio: {
    type: String,
    minlength: 10,
    maxlength: 100
  },
  twitterAcount: {
    type: String
  },
  facebookAccount: {
    type: String
  },
  linkedInAccount: {
    type: String
  },
  InstaAccount: {
    type: String
  },
  codeChefAccount: {
    type: String
  },
  gitHubAccount: {
    type: String
  },
  spojAccount: {
    type: String
  },
  mediumAccount: {
    type: String
  },
  dribbleAccount: {
    type: String
  },
  codeforcesAccount: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  lookingForJob: {
    type: Boolean,
    "default": true
  },
  accountCreateAt: {
    type: Date,
    "default": Date.now()
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    "default": true,
    select: false
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 12));

        case 4:
          this.password = _context.sent;
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
userSchema.pre(/^find/, function (next) {
  this.find({
    active: {
      $ne: false
    }
  });
  next();
});

userSchema.methods.correctPassword = function _callee2(candidatePassword, userPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(candidatePassword, userPassword));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    var changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  } // False means NOT changed


  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  var resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

var User = mongoose.model('User', userSchema);
module.exports = User;