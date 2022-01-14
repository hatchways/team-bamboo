const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res, next) => {
  // received from "protected" middleware function
  const {
    user,
    body: { notifyType, title, description, receivers },
  } = req;

  const sender = await User.findById(user.id);

  if (!sender) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const notification = await new Notification({
    sender: sender.id,
    notifyType,
    title,
    description,
    receivers,
  }).save();

  if (notification) {
    res.status(201).json({
      success: {
        id: notification.id,
        createdAt: notification.createdAt,
        notifyType: notification.notifyType,
        title: notification.title,
        description: notification.description,
        receivers: notification.receivers,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid notification data");
  }
});

exports.markNotificationRead = asyncHandler(async (req, res, next) => {
  //
});

exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  // Other properties are here in case we need to paginate all of the notifications.
  const { limit = 10, page = 1, read = null } = req.query;
});
