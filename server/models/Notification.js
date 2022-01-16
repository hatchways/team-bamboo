const mongoose = require("mongoose");

const notifyTypes = ["user", "message"];
const requireSender = ["user", "message"];

const notificationSchema = new mongoose.Schema(
  {
    notifyType: {
      type: String,
      enum: notifyTypes,
      required: [
        true,
        `A type of notification is required. Options: ${notifyTypes.join(
          ", "
        )}`,
      ],
    },
    title: {
      type: String,
      required: [true, "A notification title is required."],
      trim: true,
      maxlength: 40,
    },
    description: {
      type: String,
      required: [true, "A description of the notification is required."],
      trim: true,
      maxlength: 150,
    },
    readBy: {
      type: [
        {
          receiverId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
          readAt: { type: Date, default: Date.now() },
        },
      ],
      default: [],
      _id: false,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: [
        requiresSender,
        "Notification type requires a user as a sender.",
      ],
    },
    receivers: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: [
        validReceivers,
        "Must contain at least one recipient and/or sender cannot be included within receivers.",
      ],
    },
  },
  { timestamps: true }
);

function requiresSender() {
  return requireSender.includes(this.notifyType);
}

function validReceivers(val) {
  if (val.length < 1) return false;
  if (requiresSender.call(this)) {
    return !this.receivers.includes(this.sender);
  }
  return true;
}

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
