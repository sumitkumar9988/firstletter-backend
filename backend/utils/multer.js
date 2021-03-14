const multer=require('multer');
const path = require('path');
const AppError = require('./AppError');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);  
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
        return;
      }
      cb(null, true);
    },
  });