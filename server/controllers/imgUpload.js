const asyncHandler = require("express-async-handler");
const { uploadImages } = require("../s3");

// @route POST /images/upload
// @desc upload images to server
// @access Public
exports.saveImgsToSever = asyncHandler(async (req, res) => {
  const files = req.files;
  const result = await Promise.all(uploadImages(files));
  console.log(result);
  res.send("images uploaded");
});