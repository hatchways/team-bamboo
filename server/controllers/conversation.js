const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");

// @route GET /conversations
// @desc retrieves all conversations from the current logged in user.
// @access Private
exports.getAllConversations = asyncHandler(async (req, res) => {});
