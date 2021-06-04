const multer=require('multer');
const cloudinary = require('./cloudinary');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('image');

exports.uploadImagetoCloudinary =catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  // console.log(req.file.path);
  const result = await cloudinary.uploader.upload(req.file.path);
  req.result=result;
  next();
});

