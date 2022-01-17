const ImageUrl = require("../models/ImageUrl");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadImages } = require("../s3");


// @route POST /images/upload
// @desc upload images to server
// @access Public
exports.uploadImages = asyncHandler(async (req, res) => {
  const files = req.files;
  const results = await Promise.all(uploadImages(files));
  results.forEach(async (item) => {
    await ImageUrl.create({filePath: item.Location});
  });
  // delete images in the uploads folder 
  files.forEach(async (file) => {
    await unlinkFile(file.path);
  });
  res.status(200).json("image uploaded");
});