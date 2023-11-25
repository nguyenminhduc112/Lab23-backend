const multer = require('multer');

exports.storageMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


exports.fileFilter = function (req, file, cb) {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
