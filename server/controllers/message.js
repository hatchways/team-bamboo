const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const { findConversationQuery } = require("../utils/conversationQueries");

// @route GET /messages/:convoId
// @desc retrieves all messages by a given conversation id
// @access Private
exports.getAllMessages = asyncHandler(async (req, res) => {
  const {
    params: { convoId },
    query: { sort = "createdAt", order = "desc" },
  } = req;
  const limit = parseInt(req.query.limit || 30),
    page = parseInt(req.query.page || 1);

  const messages = await Message.find({
    conversationId: convoId,
  })
    .limit(limit)
    .lean()
    .skip((page - 1) * limit)
    .sort({
      [sort]: order,
    })
    .exec();

  return res.status(200).json({
    success: {
      messages: messages.map(({ _id, ...message }) => {
        message.id = _id;
        return message;
      }),
    },
  });
});

// @route POST /messages/send
// @desc Creates a new message.
// @access Private
exports.sendMessage = asyncHandler(async (req, res) => {
  const {
    user,
    body: { receiverId, content },
  } = req;

  const sender = await Profile.findOne({ userId: user.id });

  let conversation = await Conversation.findOne(
    findConversationQuery(sender.id, receiverId)
  );

  if (!conversation) {
    conversation = await new Conversation(
      findConversationQuery(sender.id, receiverId)
    ).save();
  }

  const message = await new Message({
    sender,
    conversationId: conversation.id,
    content,
  }).save();

  conversation.lastMessage = message._id;
  await conversation.save();

  return res.status(200).json({
    success: {
      message: {
        conversationId: message.conversationId,
        content: message.content,
        createdAt: message.createdAt,
      },
    },
  });
});
