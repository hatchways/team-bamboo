const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { saveImgsToSever } = require('../controllers/imgUpload');

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()} ${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: fileStorageEngine });

router.route('/upload').post(upload.array('images', 15), saveImgsToSever);

module.exports = router;