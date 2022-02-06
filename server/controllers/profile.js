const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const { Types } = require("mongoose");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFileToS3, uploadImages, deleteFile } = require("../s3");

// @route GET /profile/load/:id
// @desc Get user profile data
// @access Public
exports.loadProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Bad request");
  }

  const profile = await Profile.findById(id);
  res.status(200).json({
    success: { profile },
  });
});

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
      profile: updatedProfile
    }
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
      profile: profile
    }
  });
});

// @route POST /profile/upload
// @desc Upload images to server
// @access Private
exports.retrieveImgUrls = asyncHandler(async (req, res) => {
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
  };
  saveImagesToDb(results);

  //delete images in the uploads folder
  await Promise.all(
    files.map(async (file) => {
      await unlinkFile(file.path);
    })
  );
  res.status(201).json("image uploaded");
});


// @route GET /profiles/sitters?location=null&start=Date&end=Date&limit=6&page=1&order=asc
// @desc fetch all profiles that match the provided criteria
// @access Public

exports.getAllSitters = asyncHandler(async (req, res) => {
  let { limit = 6, page = 1, order = "desc" } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);

  const query = {
    isSitter: {
      $eq: true,
    },
    hourlyRate: {
      $exists: true,
    },
  };

  if (req.user) {
    query.userId = {
      $ne: req.user.id,
    };
  }

  const profiles = await Profile.find(query)
    .skip(limit * (page - 1))
    .limit(limit)
    .lean()
    .exec();

  res.status(200).json({
    success: {
      profiles: profiles.map(({ _id, ...profile }) => ({
        id: _id,
        ...profile,
      })),
    },
  });
});

// @route POST /profile/upload-avatar
// @desc Upload a profile photo to server
// @access Private
exports.retrieveAvatarUrl = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  const file = req.file;
  const result = await uploadFileToS3(file);
  profile.photo = result.Location;
  await profile.save();
  await unlinkFile(file.path);
  res.status(201).json({
    imageKey: result.Key
  });
});

// @route DELETE /profile/photo/:key
// @desc Delete a profile photo from sever
// @access Private
exports.deleteProfilePhoto = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  const key = req.params.key;
  await deleteFile(key);
  profile.photo = "";
  await profile.save();
  res.status(200).json("profile photo deleted");
};
