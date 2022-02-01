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
    user,
    params: { convoId },
    query: { sort = "createdAt", order = "asc" },
  } = req;
  const limit = parseInt(req.query.limit || 30),
    page = parseInt(req.query.page || 1);

  const profile = await Profile.findOne({ userId: user.id });

  const conversation = await Conversation.findOne({
    id: convoId,
    $or: [
      {
        user1: {
          $eq: profile.id,
        },
      },
      {
        user2: {
          $eq: profile.id,
        },
      },
    ],
  });

  if (conversation) {
    const messages = await Message.find({
      conversationId: convoId,
    })
      .limit(limit)
      .lean()
      .skip((page - 1) * limit)
      .populate({
        path: "sender",
        select: {
          _id: 1,
          name: 1,
          photo: 1,
        },
      })
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
  }

  return res
    .status(401)
    .json({ error: { message: "User is not authorized." } });
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
        sender: {
          id: sender.id,
          name: sender.name,
          photo: sender.photo,
        },
        conversationId: message.conversationId,
        content: message.content,
        createdAt: message.createdAt,
      },
    },
  });
});
