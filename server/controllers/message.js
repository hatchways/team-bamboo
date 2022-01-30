const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// @route GET /messages/:convoId
// @desc retrieves all messages by a given conversation id
// @access Private
exports.getAllMessages = asyncHandler(async (req, res) => {});

// @route POST /messages/send
// @desc Creates a new message.
// @access Private
exports.sendMessage = asyncHandler(async (req, res) => {});
