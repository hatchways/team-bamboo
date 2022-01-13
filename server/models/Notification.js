const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notifyType: {
      type: String,
      enum: ["system", "event", "user", "message"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    readBy: {
      type: [
        {
          readBy: { type: mongoose.Types.ObjectId, ref: "User" },
          readAt: { type: Date, default: Date.now() },
        },
      ],
      default: [],
    },
    sender: {
      type: mongoose.Types.ObjectId,
    },
    receiver: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  // Use timestamps instead of date -> createdAt and updatedAt
  { timestamps: true }
);

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
