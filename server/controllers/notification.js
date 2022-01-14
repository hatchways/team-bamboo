const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res, next) => {
  //
});

exports.markNotificationRead = asyncHandler(async (req, res, next) => {
  //
});

exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  // Other properties are here in case we need to paginate all of the notifications.
  const { limit = 10, page = 1, read = null } = req.query;
});
