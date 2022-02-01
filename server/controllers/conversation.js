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
  const { user } = req;

  const profile = await Profile.findOne({ userId: user.id }).exec();

  const conversations = await Conversation.aggregate([
    queryConversationsByProfile(profile._id),
    formatConversationFields(profile._id),
    ...populateOtherUser(),
    ...populateLastMessage(),
  ]);

  res.status(200).json({
    success: {
      conversations,
    },
  });
});
