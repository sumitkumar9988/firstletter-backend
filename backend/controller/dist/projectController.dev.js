"use strict";

var Project = require('./../models/projectModel');

var User = require('./../models/userModel');

var AppError = require('./../utils/AppError');

var catchAsync = require('./../utils/catchAsync');

var axios = require('axios');

exports.guthubOAoth = catchAsync(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.status('200').json({
            status: 'success',
            redirect: "https://github.com/login/oauth/authorize?client_id=".concat(process.env.GITHUB_CLIENT_ID)
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.githubCallBack = catchAsync(function _callee2(req, res, next) {
  var requestToken, _ref, data, access_token, response;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          requestToken = req.query.code;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.post("https://github.com/login/oauth/access_token?client_id=".concat(process.env.GITHUB_CLIENT_ID, "&client_secret=").concat(process.env.GITHUB_SECRET_KEY, "&code=").concat(requestToken)));

        case 3:
          _ref = _context2.sent;
          data = _ref.data;
          access_token = data.split('&')[0];
          access_token = access_token.split('=')[1];
          _context2.next = 9;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/user", {
            headers: {
              Authorization: 'token ' + access_token
            }
          }));

        case 9:
          response = _context2.sent;

          if (response.data.login) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Some error occurred while GitHub OAuth', 404)));

        case 12:
          res.status(201).json({
            status: 'success',
            redirect: '/success',
            data: {
              username: response.data.login,
              name: response.data.name
            }
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.setGitHubUserName = catchAsync(function _callee3(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (req.body.githubUserName) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return", next(new AppError('Please Authorize GitHub again')));

        case 2:
          githubUserName = {
            gitHubAccount: req.body.githubUserName
          };
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, githubUserName, {
            "new": true,
            runValidators: true
          }));

        case 5:
          user = _context3.sent;
          res.status(201).json({
            status: 'success',
            message: 'Github username save'
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllUserProject = catchAsync(function _callee4(req, res, next) {
  var user, _ref2, data, projects, currentProject, itemToInsertINtoDatabase, allProject;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context4.sent;

          if (user.gitHubAccount) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new AppError('Please provide your GitHub account', 404)));

        case 5:
          console.log(user.gitHubAccount);
          _context4.next = 8;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/users/".concat(user.gitHubAccount, "/repos")));

        case 8:
          _ref2 = _context4.sent;
          data = _ref2.data;
          projects = data.map(function (item, index) {
            return {
              user: req.user.id,
              name: item.name,
              repoID: item.id,
              repoUrl: item.url,
              DemoUrl: item.html_url,
              updated_at: item.updated_at,
              description: item.description
            };
          });
          _context4.next = 13;
          return regeneratorRuntime.awrap(Project.find({
            user: req.user.id
          }));

        case 13:
          currentProject = _context4.sent;
          itemToInsertINtoDatabase = projects.filter(function (el) {
            return !currentProject.filter(function (item) {
              return item.repoID === el.repoID;
            }).length;
          }); // !b.filter(y => y.id === i.id).length
          //create multiple documents

          _context4.next = 17;
          return regeneratorRuntime.awrap(Project.insertMany(itemToInsertINtoDatabase));

        case 17:
          _context4.next = 19;
          return regeneratorRuntime.awrap(Project.find({
            user: req.user.id
          }));

        case 19:
          allProject = _context4.sent;
          res.status('200').json({
            status: 'success',
            length: allProject.length,
            data: {
              projects: allProject
            }
          });

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getProjectDetails = catchAsync(function _callee5(req, res, next) {
  var project;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Project.findById(req.params.id));

        case 2:
          project = _context5.sent;

          if (project) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new AppError('Project Details Not Found', 404)));

        case 5:
          res.status(201).json({
            status: 'success',
            data: {
              project: project
            }
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updateProjectDetails = catchAsync(function _callee6(req, res, next) {
  var project;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          data = req.body;

          if (req.result) {
            data.projectLogo = req.result.url;
          }

          _context6.next = 4;
          return regeneratorRuntime.awrap(Project.findByIdAndUpdate(req.params.id, data, {
            "new": true,
            runValidators: true
          }));

        case 4:
          project = _context6.sent;

          if (project) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", next(new AppError('Project not found By id', 404)));

        case 7:
          return _context6.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Project Details Update Successully'
          }));

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
});