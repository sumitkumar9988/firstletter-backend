"use strict";

var User = require('./../models/userModel');

var Education = require('./../models/educationModel');

var Experience = require('./../models/experienceModels');

var AppError = require('./../utils/AppError');

var catchAsync = require('./../utils/catchAsync');

var Certificate = require('./../models/CertificateModels');

var resume = '../data/resume.pdf'; // https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/resume+(2).pdf

exports.uploadLinkedInResume = catchAsync(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  });
});

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

exports.userDetail = catchAsync(function _callee2(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context2.sent;
          res.status(200).json({
            status: 'success',
            data: {
              user: user
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.updateUserDetail = catchAsync(function _callee3(req, res, next) {
  var filteredBody, updatedUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.photo = req.result.url;
          }

          console.log(data);
          filteredBody = filterObj(data, 'email', 'name', 'photo', 'bio', 'skills', 'location', 'lookingForJob');
          console.log(filteredBody);
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 7:
          updatedUser = _context3.sent;
          res.status(200).json({
            status: 'success',
            data: {
              user: updatedUser
            }
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.deleteUser = catchAsync(function _callee4(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          user = _context4.sent;
          res.status(200).json({
            status: 'success',
            data: null
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getEducationDetail = catchAsync(function _callee5(req, res, next) {
  var education;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Education.findById(req.params.id));

        case 2:
          education = _context5.sent;
          res.status(201).json({
            status: 'success',
            length: education.size,
            data: {
              education: education
            }
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getAllEducation = catchAsync(function _callee6(req, res, next) {
  var education;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Education.find({
            user: req.user.id
          }));

        case 2:
          education = _context6.sent;
          res.status(201).json({
            status: 'success',
            length: education.length,
            data: {
              education: education
            }
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.addEducation = catchAsync(function _callee7(req, res, next) {
  var logo, education, educationDoc;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
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
          _context7.next = 4;
          return regeneratorRuntime.awrap(Education.create(education));

        case 4:
          educationDoc = _context7.sent;
          res.status(200).json({
            status: 'success',
            message: 'education update successful'
          });

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.deleteEducationDetail = catchAsync(function _callee8(req, res, next) {
  var educationDoc;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Education.findByIdAndDelete(req.params.id));

        case 2:
          educationDoc = _context8.sent;

          if (educationDoc) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            message: 'item delete successfully'
          });

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.updateEducation = catchAsync(function _callee9(req, res, next) {
  var education;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.instituteLogo = req.result.url;
          }

          _context9.next = 4;
          return regeneratorRuntime.awrap(Education.findByIdAndUpdate(req.params.id, data, {
            "new": true,
            runValidators: true
          }));

        case 4:
          education = _context9.sent;

          if (education) {
            _context9.next = 7;
            break;
          }

          return _context9.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 7:
          res.status(201).json({
            status: 'success'
          });

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
});
exports.allUserExeprience = catchAsync(function _callee10(req, res, next) {
  var experience;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Experience.find({
            user: req.user.id
          }));

        case 2:
          experience = _context10.sent;
          res.status(201).json({
            status: 'success',
            length: experience.size,
            data: {
              experience: experience
            }
          });

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
exports.getExperienceById = catchAsync(function _callee11(req, res, next) {
  var experience;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Experience.findById(req.params.id));

        case 2:
          experience = _context11.sent;
          res.status(201).json({
            status: 'success',
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
exports.addExperience = catchAsync(function _callee12(req, res, next) {
  var logo, experience, experienceDoc;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
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
          _context12.next = 4;
          return regeneratorRuntime.awrap(Experience.create(experience));

        case 4:
          experienceDoc = _context12.sent;
          res.status(200).json({
            status: 'success',
            data: {
              experience: experienceDoc
            }
          });

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  });
});
exports.deleteExperienceDetail = catchAsync(function _callee13(req, res, next) {
  var experienceDoc;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(Experience.findByIdAndDelete(req.params.id));

        case 2:
          experienceDoc = _context13.sent;

          if (experienceDoc) {
            _context13.next = 5;
            break;
          }

          return _context13.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            message: 'item delete successfully'
          });

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
});
exports.updateExperience = catchAsync(function _callee14(req, res, next) {
  var experience;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.organizationLogo = req.result.url;
          }

          _context14.next = 4;
          return regeneratorRuntime.awrap(Experience.findByIdAndUpdate(req.params.id, data, {
            "new": true,
            runValidators: true
          }));

        case 4:
          experience = _context14.sent;

          if (experience) {
            _context14.next = 7;
            break;
          }

          return _context14.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 7:
          res.status(201).json({
            status: 'success'
          });

        case 8:
        case "end":
          return _context14.stop();
      }
    }
  });
});
exports.updateBasicDetails = catchAsync(function _callee15(req, res, next) {
  var userData, checkUsername, user;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          userData = {
            username: req.body.username,
            profession: req.body.profession,
            bio: req.body.bio
          };

          if (req.body.username) {
            _context15.next = 3;
            break;
          }

          return _context15.abrupt("return", next(new AppError('username is required', 404)));

        case 3:
          checkUsername = User.findOne({
            username: req.body.username
          });
          console.log(checkUsername);

          if (!checkUsername) {
            _context15.next = 7;
            break;
          }

          return _context15.abrupt("return", next(new AppError('Chooose another username', 404)));

        case 7:
          _context15.next = 9;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, userData, {
            "new": true,
            runValidators: true
          }));

        case 9:
          user = _context15.sent;
          res.status(200).json({
            status: 'success',
            data: {
              user: user
            }
          });

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  });
});
exports.updateSocialNetworking = catchAsync(function _callee16(req, res, next) {
  var filteredBody, user;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          console.log(req.body);
          filteredBody = filterObj(req.body, 'twitterAcount', 'facebookAccount', 'linkedInAccount', 'InstaAccount', 'spojAccount', 'mediumAccount');
          console.log(filteredBody);
          _context16.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 5:
          user = _context16.sent;
          res.status(200).json({
            status: 'success',
            data: {
              user: user
            }
          });

        case 7:
        case "end":
          return _context16.stop();
      }
    }
  });
});
exports.addCertificate = catchAsync(function _callee17(req, res, next) {
  var certificateData, certificate;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          certificateData = {
            user: req.user.id,
            name: req.body.name,
            image: req.result.url,
            isseueDate: req.body.isseueDate,
            Organization: req.body.Organization,
            url: req.body.url
          };
          _context17.next = 3;
          return regeneratorRuntime.awrap(Certificate.create(certificateData));

        case 3:
          certificate = _context17.sent;
          console.log(certificate);
          res.status(200).json({
            status: 'success'
          });

        case 6:
        case "end":
          return _context17.stop();
      }
    }
  });
});
exports.getYourCertificate = catchAsync(function _callee18(req, res, next) {
  var certificate;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(Certificate.find({
            user: req.user.id
          }));

        case 2:
          certificate = _context18.sent;
          res.status(200).json({
            status: 'success',
            length: certificate.length,
            data: {
              certificate: certificate
            }
          });

        case 4:
        case "end":
          return _context18.stop();
      }
    }
  });
});
exports.getCertificateByID = catchAsync(function _callee19(req, res, next) {
  var certificate;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(Certificate.findById(req.params.id));

        case 2:
          certificate = _context19.sent;

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
          return _context19.stop();
      }
    }
  });
});
exports.deleteCertificate = catchAsync(function _callee20(req, res, next) {
  var certificate;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(Certificate.findByIdAndDelete(req.params.id));

        case 2:
          certificate = _context20.sent;

          if (certificate) {
            _context20.next = 5;
            break;
          }

          return _context20.abrupt("return", next(new AppError('No document found with that ID', 404)));

        case 5:
          res.status(200).json({
            status: 'success',
            message: 'item delete successfully'
          });

        case 6:
        case "end":
          return _context20.stop();
      }
    }
  });
});