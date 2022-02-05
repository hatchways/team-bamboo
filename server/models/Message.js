const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: [true, "A message must contain the sender"],
    },
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "Conversation",
      required: [true, "A message must contain the referenced conversation"],
      index: true,
    },
    content: {
      type: String,
      required: [true, "A message must contain content"],
      trim: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

Message.syncIndexes();

module.exports = Message;
