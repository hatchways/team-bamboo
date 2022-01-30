const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

// @route GET /conversations
// @desc retrieves all conversations from the current logged in user.
// @access Private
exports.getAllConversations = asyncHandler(async (req, res) => {
  const { user } = req;

  const profile = await Profile.findOne({ userId: user.id }).exec();

  const findConversations = {
    $match: {
      $or: [
        {
          user1: {
            $eq: mongoose.Types.ObjectId(profile._id),
          },
        },
        {
          user2: {
            $eq: mongoose.Types.ObjectId(profile._id),
          },
        },
      ],
    },
  };

  const formatData = {
    $project: {
      _id: 0,
      id: "$_id",
      otherUser: {
        $cond: {
          if: {
            $eq: ["$user1", mongoose.Types.ObjectId(profile._id)],
          },
          then: "$user2",
          else: "$user1",
        },
      },
      lastMessage: "$lastMessage",
    },
  };

  const populateData = [
    {
      $lookup: {
        from: "profiles",
        localField: "otherUser",
        foreignField: "_id",
        as: "otherUser",
      },
    },
    { $unwind: "$otherUser" },
  ];

  const conversations = await Conversation.aggregate([
    findConversations,
    formatData,
    ...populateData,
  ]);

  res.status(200).json({
    success: {
      conversations,
    },
  });
});
