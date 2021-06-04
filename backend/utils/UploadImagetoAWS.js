const multer = require('multer');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');
const { v4: uuidv4 } = require('uuid');
const s3 = require('./s3');

const multerStorage = multer.memoryStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('image');

exports.uploadImageToS3 = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  let myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      return next(
        new AppError('Something went wrong with storage try again later', 404)
      );
    }
    // const result = {
    //   url: data.Location,
    //   key: data.Key,
    // };
    // req.result = result;
    req.body.image=data.Location
    next();
  });
});
