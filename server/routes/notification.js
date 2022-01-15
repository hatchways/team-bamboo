const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  markNotificationRead,
  getAllNotifications,
} = require("../controllers/notification");

router.route("/create").post(protect, createNotification);

router.route("/mark-read").post(protect, markNotificationRead);

router.route("/all").get(protect, getAllNotifications);

module.exports = router;
