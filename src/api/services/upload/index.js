const multer = require('multer');
// define multer storage configuration
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, `${process.env.PWD}/storage/`);
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
