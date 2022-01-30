const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

const {
  getConversationsQuery,
  getFormattedData,
  getPopulatedData,
} = require("../utils/conversationQueries");

// @route GET /conversations
// @desc retrieves all conversations from the current logged in user.
// @access Private
exports.getAllConversations = asyncHandler(async (req, res) => {
  const { user } = req;

  const profile = await Profile.findOne({ userId: user.id }).exec();

  const conversations = await Conversation.aggregate([
    getConversationsQuery(profile._id),
    getFormattedData(profile._id),
    ...getPopulatedData(),
  ]);

  res.status(200).json({
    success: {
      conversations,
    },
  });
});
