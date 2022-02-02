const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const { conversationContainsUser } = require("../utils/conversationQueries");

// @route GET /conversations/:id/messages?limit=30&page=1&sort=createdAt&order=asc
// @desc retrieves all messages by a given conversation id
// @access Private
exports.getAllMessages = asyncHandler(async (req, res) => {
  const {
    user,
    params: { id },
    query: { sort = "createdAt", order = "asc" },
  } = req;
  const limit = parseInt(req.query.limit || 30),
    page = parseInt(req.query.page || 1);

  const profile = await Profile.findOne({ userId: user.id });

  const conversation = await Conversation.findOne(
    conversationContainsUser(id, profile.id)
  );

  if (conversation) {
    const messages = await Message.find({
      conversationId: conversation.id,
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

  return res.status(401).json({ error: "User is not authorized." });
});

// @route POST /conversations/:id/messages
// @desc Creates a new message.
// @access Private
exports.sendMessage = asyncHandler(async (req, res) => {
  const {
    user,
    params: { id },
    body: { content },
  } = req;

  const sender = await Profile.findOne({ userId: user.id });

  const conversation = await Conversation.findOne(
    conversationContainsUser(id, sender.id)
  );

  const message = await new Message({
    sender,
    conversationId: id,
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
