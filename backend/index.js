const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/AppError');
const authRouter = require('./router/authRouter');
const portfolioRouter = require('./router/portfolioRouter');

const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(compression());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/v1/user', authRouter);
app.use('/api/v1', portfolioRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`working on port ${port}`));