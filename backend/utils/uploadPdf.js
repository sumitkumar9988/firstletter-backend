const multer=require('multer');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');
const { v4: uuidv4 } = require('uuid');
const s3 = require('./s3');
const multerStorage = multer.diskStorage({});


const multerFilter = (req, file, cb) => {
   if (file.mimetype.split("/")[1] === "pdf") {
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

exports.uploadPDFToS3 = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('File is missing Please upload file'));

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
        new AppError('Something went wrong with storage try again later', 4040)
      );
    }
    // console.log(data.Location);
    const result = {
      url: data.Location,
      key: data.Key,
    };
    req.result = result;
    next();
  });
});

