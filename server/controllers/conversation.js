const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

const {
  queryConversationsByProfile,
  formatConversationFields,
  populateOtherUser,
  populateLastMessage,
} = require("../utils/conversationQueries");

// @route GET /conversations
// @desc retrieves all conversations from the current logged in user.
// @access Private
exports.getAllConversations = asyncHandler(async (req, res) => {
  const { profile } = req;

  const conversations = await Conversation.aggregate([
    queryConversationsByProfile(profile._id.toString()),
    formatConversationFields(profile._id.toString()),
    ...populateOtherUser(),
    ...populateLastMessage(),
  ]);

  res.status(200).json({
    success: {
      conversations,
    },
  });
});

// @route POST /conversations
// @desc creates a new conversation between two users
// @access Private
exports.createNewConversation = asyncHandler(async (req, res) => {
  const {
    user,
    body: { otherUserId },
  } = req;

  if (user.id === otherUserId) {
    return res.status(400).json({
      error: {
        message: "A conversation can only exists between two different users.",
      },
    });
  }

  const [user1, user2] = await Profile.find({
    $or: [
      {
        userId: user.id,
      },
      {
        userId: otherUserId,
      },
    ],
  })
    .select({
      _id: 1,
      userId: 1,
      name: 1,
      photo: 1,
    })
    .exec();

  let conversation = await Conversation.findOne({
    $or: [
      {
        user1: user1._id,
        user2: user2._id,
      },
      {
        user1: user2._id,
        user2: user1._id,
      },
    ],
  });

  if (!conversation) {
    conversation = await new Conversation({
      user1: user1._id,
      user2: user2._id,
    }).save();
  }

  const otherUser = user1.userId.toString() === otherUserId ? user1 : user2;

  return res.status(200).json({
    success: {
      conversation: {
        id: conversation.id,
        otherUser: {
          id: otherUser._id,
          userId: otherUser.userId,
          name: otherUser.name,
          photo: otherUser.photo,
        },
      },
    },
  });
});
