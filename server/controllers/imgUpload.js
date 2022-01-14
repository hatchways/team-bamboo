// @route POST /images/upload
// @desc upload images to server
// @access Public
exports.saveImgsToSever = (req, res) => {
  console.log("to controller");
  const file = req.file;
  const description = req.body.description;
  console.log(file);
  res.send("images uploaded to server");
};