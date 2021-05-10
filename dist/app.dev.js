"use strict";

var express = require('express');

var dotenv = require('dotenv');

var mongoose = require('mongoose');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var compression = require('compression');

var cors = require('cors');

var globalErrorHandler = require('./backend/controller/errorController');

var AppError = require('./backend/utils/AppError');

var authRouter = require('./backend/router/authRouter');

var portfolioRouter = require('./backend/router/portfolioRouter');

var app = express();
dotenv.config();
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

var limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.get('/', function (req, res) {
  return res.status(200).json({
    status: 'success'
  });
});
app.use('/api', limiter);
app.use(compression()); // Data sanitization against NoSQL query injection

app.use(mongoSanitize()); // Data sanitization against XSS

app.use(xss());
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB connection successful!');
})["catch"](function (err) {
  return console.log(err);
});
app.use(express.json());
app.use('/api/v1/user', authRouter);
app.use('/api/v1', portfolioRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404));
});
app.use(globalErrorHandler);
var port = process.env.PORT || 3000;
app.listen(port, console.log("working on port ".concat(port)));