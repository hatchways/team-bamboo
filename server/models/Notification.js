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
          id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
          read: { type: Boolean, default: false },
          readAt: { type: Date },
        },
      ],
      _id: false,
      validate: [validArrayLength, "Must contain at least one recipient."],
    },
  },
  { timestamps: true }
);

function requiresSender() {
  return requireSender.includes(this.notifyType);
}

function validArrayLength(val) {
  return val.length >= 1;
}

notificationSchema.pre("save", async function (next) {
  const ids = this.receivers.map((receiver) => receiver.id.toString());
  this.receivers = this.receivers.filter(
    (receiver, index) => !ids.includes(receiver.id.toString(), index + 1)
  );
});

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
