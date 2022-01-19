const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadImages } = require("../s3");

// @route PUT /profile/edit
// @desc edit user profile
// @access Private
exports.editProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  profile.set(req.body);
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

// @route POST /profile/upload
// @desc Upload images to server
// @access Private
exports.uploadImages = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
 
  const files = req.files;
  const results = await Promise.all(uploadImages(files));
  const saveImagesToDb = async (results) => {
    for (let i = 0; i < results.length; i++) {
      const imageUrl = {
        filePath: results[i].Location
      };
      profile.uploadedImages.push(imageUrl);
      await profile.save();
    }
  }
  saveImagesToDb(results);

  //delete images in the uploads folder 
  await Promise.all(files.map(async (file) => {
    await unlinkFile(file.path);
  }));
  res.status(201).json("image uploaded");
});