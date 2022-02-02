const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

const validateSitter = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (profile.isSitter) {
    next();
  } else {
    return res.status(401).send("The user is not a sitter");
  }
});

module.exports = validateSitter;
