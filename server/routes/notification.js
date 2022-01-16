const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  markNotificationRead,
  getAllNotifications,
  markAllNotificationsRead,
} = require("../controllers/notification");

router.route("/").post(protect, createNotification);

router.route("/mark-read/:id").patch(protect, markNotificationRead);

router.route("/all/mark-read").patch(protect, markAllNotificationsRead);

router.route("/all").get(protect, getAllNotifications);

module.exports = router;
