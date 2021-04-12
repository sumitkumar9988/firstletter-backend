"use strict";

var User = require('./../models/userModel');

var Education = require('./../models/educationModel');

var Experience = require('./../models/experienceModels');

var AppError = require('./../utils/AppError');

var catchAsync = require('./../utils/catchAsync');

var Certificate = require('./../models/CertificateModels'); // const resume = '../data/resume.pdf';
// https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/resume+(2).pdf


var filterObj = function filterObj(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.userDetail = catchAsync(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context.sent;
          res.status(200).json({
            status: 'success',
            data: {
              user: user
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateUserDetail = catchAsync(function _callee2(req, res, next) {
  var filteredBody, updatedUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.photo = req.result.url;
          }

          filteredBody = filterObj(data, 'email', 'name', 'photo', 'bio', 'skills', 'location', 'profession', 'lookingForJob');
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedUser = _context2.sent;
          res.status(200).json({
            status: 'success',
            message: 'User details update successfully!'
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.updateusername = catchAsync(function _callee3(req, res, next) {
  var userData, checkUsername;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userData = {
            username: req.body.username
          };

          if (req.body.username) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", next(new AppError('username is required', 404)));

        case 3:
          checkUsername = User.findOne({
            username: req.body.username
          });
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, userData, {
            "new": true,
            runValidators: true
          }));

        case 6:
          res.status(200).json({
            status: 'success',
            message: 'Users Details update sucessfull!'
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.updateSocialNetworking = catchAsync(function _callee4(req, res, next) {
  var filteredBody, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          filteredBody = filterObj(req.body, 'twitterAcount', 'facebookAccount', 'linkedInAccount', 'InstaAccount', 'gitHubAccount', 'mediumAccount');
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next(new AppError('There is no such user with these id', 400)));

        case 6:
          res.status(200).json({
            status: 'success',
            message: 'Users Details update successfully!'
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.deleteUser = catchAsync(function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          user = _context5.sent;

          if (user) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new AppError('There is no such user with this id', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            data: 'Account Deactivate! You can login your account whenever you want '
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getEducationDetail = catchAsync(function _callee6(req, res, next) {
  var education;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Education.findById(req.params.id));

        case 2:
          education = _context6.sent;

          if (education) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new AppError('No document found with that ID', 400)));

        case 5:
          res.status(201).json({
            status: 'success',
            data: {
              education: education
            }
          });

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.getAllEducation = catchAsync(function _callee7(req, res, next) {
  var education;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Education.find({
            user: req.user.id
          }));

        case 2:
          education = _context7.sent;
          res.status(201).json({
            status: 'success',
            length: education.length,
            data: {
              education: education
            }
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.addEducation = catchAsync(function _callee8(req, res, next) {
  var logo, education, educationDoc;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.result) {
            logo = 'defauult.jpg';
          } else {
            logo = req.result.url;
          }

          education = {
            institute: req.body.institute,
            user: req.user.id,
            basicinfo: req.body.basicinfo,
            instituteLogo: logo,
            degree: req.body.degree,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            grade: req.body.grade,
            activitiesAndSocieties: req.body.activitiesAndSocieties
          };
          _context8.next = 4;
          return regeneratorRuntime.awrap(Education.create(education));

        case 4:
          educationDoc = _context8.sent;
          res.status(200).json({
            status: 'success',
            message: 'new education add successful'
          });

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.deleteEducationDetail = catchAsync(function _callee9(req, res, next) {
  var educationDoc;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Education.findByIdAndDelete(req.params.id));

        case 2:
          educationDoc = _context9.sent;

          if (educationDoc) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            message: 'Item delete successfully'
          });

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
});
exports.updateEducation = catchAsync(function _callee10(req, res, next) {
  var education;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.instituteLogo = req.result.url;
          }

          _context10.next = 4;
          return regeneratorRuntime.awrap(Education.findByIdAndUpdate(req.params.id, data, {
            "new": true,
            runValidators: true
          }));

        case 4:
          education = _context10.sent;

          if (education) {
            _context10.next = 7;
            break;
          }

          return _context10.abrupt("return", next(new AppError('No document found with that ID', 400)));

        case 7:
          res.status(201).json({
            status: 'success',
            message: 'Education update successfully'
          });

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  });
});
exports.allUserExeprience = catchAsync(function _callee11(req, res, next) {
  var experience;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Experience.find({
            user: req.user.id
          }));

        case 2:
          experience = _context11.sent;
          res.status(201).json({
            status: 'success',
            length: experience.length,
            data: {
              experience: experience
            }
          });

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
});
exports.getExperienceById = catchAsync(function _callee12(req, res, next) {
  var experience;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(Experience.findById(req.params.id));

        case 2:
          experience = _context12.sent;

          if (experience) {
            _context12.next = 5;
            break;
          }

          return _context12.abrupt("return", next(new AppError('No such data availabe with this ID', 400)));

        case 5:
          res.status(201).json({
            status: 'success',
            data: {
              experience: experience
            }
          });

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  });
});
exports.addExperience = catchAsync(function _callee13(req, res, next) {
  var logo, experience, experienceDoc;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!req.result) {
            logo = 'default.jpg';
          } else {
            logo = req.result.url;
          }

          experience = {
            jobTitle: req.body.jobTitle,
            user: req.user.id,
            organization: req.body.organization,
            organizationLogo: logo,
            website: req.body.website,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            duration: req.body.duration,
            responsibilities: req.body.responsibilities
          };
          _context13.next = 4;
          return regeneratorRuntime.awrap(Experience.create(experience));

        case 4:
          experienceDoc = _context13.sent;
          res.status(200).json({
            status: 'success',
            message: 'new experience add successfully '
          });

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
});
exports.deleteExperienceDetail = catchAsync(function _callee14(req, res, next) {
  var experienceDoc;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(Experience.findByIdAndDelete(req.params.id));

        case 2:
          experienceDoc = _context14.sent;

          if (experienceDoc) {
            _context14.next = 5;
            break;
          }

          return _context14.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            message: 'Item delete successfully'
          });

        case 6:
        case "end":
          return _context14.stop();
      }
    }
  });
});
exports.updateExperience = catchAsync(function _callee15(req, res, next) {
  var experience;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.organizationLogo = req.result.url;
          }

          _context15.next = 4;
          return regeneratorRuntime.awrap(Experience.findByIdAndUpdate(req.params.id, data, {
            "new": true,
            runValidators: true
          }));

        case 4:
          experience = _context15.sent;

          if (experience) {
            _context15.next = 7;
            break;
          }

          return _context15.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 7:
          res.status(201).json({
            status: 'success',
            message: 'Experience details update successfully'
          });

        case 8:
        case "end":
          return _context15.stop();
      }
    }
  });
});
exports.addCertificate = catchAsync(function _callee16(req, res, next) {
  var certificateData, certificate;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          certificateData = {
            user: req.user.id,
            name: req.body.name,
            image: req.result.url,
            isseueDate: req.body.isseueDate,
            Organization: req.body.Organization,
            url: req.body.url
          };
          _context16.next = 3;
          return regeneratorRuntime.awrap(Certificate.create(certificateData));

        case 3:
          certificate = _context16.sent;
          res.status(200).json({
            status: 'success',
            message: 'New Certificate add successfully'
          });

        case 5:
        case "end":
          return _context16.stop();
      }
    }
  });
});
exports.getYourCertificate = catchAsync(function _callee17(req, res, next) {
  var certificate;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(Certificate.find({
            user: req.user.id
          }));

        case 2:
          certificate = _context17.sent;
          res.status(200).json({
            status: 'success',
            length: certificate.length,
            data: {
              certificate: certificate
            }
          });

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
});
exports.getCertificateByID = catchAsync(function _callee18(req, res, next) {
  var certificate;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(Certificate.findById(req.params.id));

        case 2:
          certificate = _context18.sent;

          if (!certificate) {
            next(new AppError('No certificate found By this id', 404));
          }

          res.status(200).json({
            status: 'success',
            data: {
              certificate: certificate
            }
          });

        case 5:
        case "end":
          return _context18.stop();
      }
    }
  });
});
exports.deleteCertificate = catchAsync(function _callee19(req, res, next) {
  var certificate;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(Certificate.findByIdAndDelete(req.params.id));

        case 2:
          certificate = _context19.sent;

          if (certificate) {
            _context19.next = 5;
            break;
          }

          return _context19.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            message: 'item delete successfully'
          });

        case 6:
        case "end":
          return _context19.stop();
      }
    }
  });
});
exports.uploadLinkedInResume = catchAsync(function _callee20(req, res, next) {
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          return _context20.abrupt("return", res.status(205).json({
            status: 'success',
            message: 'this API is still in development stage !wait till this goes to production'
          }));

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
});