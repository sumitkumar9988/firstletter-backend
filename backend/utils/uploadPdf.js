const multer=require('multer');
const cloudinary = require('./cloudinary');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
    const ext=path.extname(file.originalname);
  if (ext ==='pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Not an Pdf! Please upload only pdf downloaded from https://www.linkedin.com/', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadResume = upload.single('resume');

exports.uploadResumetoCloudinary =catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  console.log(req.file.path);
  const result = await cloudinary.uploader.upload(req.file.path);
  req.result=result;
  next();
});