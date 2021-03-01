const multer  = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../images'));
  },
  filename: function(req, file, cb) {
      let ext;
      if (file.mimetype == 'image/jpeg') {
          ext ='.jpg';
      } else if (file.mimetype === 'image/png') {
          ext = '.png';
      }
      cb(null, shortid.generate() + ext);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
      } else {
          cb(null, false);
      }
  }, 
});

module.exports = {
  upload,
}