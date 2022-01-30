const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  profile1: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: [true, "A conversation must contain two profiles"],
  },
  profile2: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: [true, "A conversation must contain two profiles"],
  },
  lastMessage: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
  },
});

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
