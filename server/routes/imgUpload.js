const express = require('express');
const router = express.Router();
const multer = require('multer');
const { saveImgsToSever } = require('../controllers/imgUpload');

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: fileStorageEngine });

router.route('/images').post(upload.array('images', 15), saveImgsToSever);

module.exports = router;