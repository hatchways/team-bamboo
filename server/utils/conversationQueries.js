const mongoose = require("mongoose");

exports.queryConversationsByProfile = (profileId) => ({
  $match: {
    $or: [
      {
        user1: {
          $eq: mongoose.Types.ObjectId(profileId),
        },
      },
      {
        user2: {
          $eq: mongoose.Types.ObjectId(profileId),
        },
      },
    ],
  },
});

exports.formatConversationFields = (profileId) => ({
  $project: {
    _id: 0,
    id: "$_id",
    otherUser: {
      $cond: {
        if: {
          $eq: ["$user1", mongoose.Types.ObjectId(profileId)],
        },
        then: "$user2",
        else: "$user1",
      },
    },
    lastMessage: "$lastMessage",
  },
});

exports.populateOtherUser = () => [
  {
    $lookup: {
      from: "profiles",
      let: { profileId: "$otherUser" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$profileId"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            photo: 1,
          },
        },
      ],
      as: "otherUser",
    },
  },
  { $unwind: "$otherUser" },
];

exports.populateLastMessage = () => [
  {
    $lookup: {
      from: "messages",
      let: { messageId: "$lastMessage" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$messageId"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            sender: 1,
            content: 1,
            read: 1,
            createdAt: 1,
          },
        },
      ],
      as: "lastMessage",
    },
  },
  { $unwind: "$lastMessage" },
];

exports.findConversationQuery = (senderId, receiverId) => ({
  $or: [
    {
      user1: senderId,
      user2: receiverId,
    },
    {
      user1: receiverId,
      user2: senderId,
    },
  ],
});
