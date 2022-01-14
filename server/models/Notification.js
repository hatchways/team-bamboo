const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notifyType: {
      type: String,
      enum: ["user", "message"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
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
    receivers: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      required: true,
    },
  },
  // Use timestamps instead of date -> createdAt and updatedAt
  { timestamps: true }
);

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
