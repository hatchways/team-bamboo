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

module.exports = Message = mongoose.model("Message", messageSchema);
