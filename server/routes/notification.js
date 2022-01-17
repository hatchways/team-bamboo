const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateNotification } = require("../validate");
const {
  createNotification,
  markNotificationRead,
  getNotifications,
} = require("../controllers/notification");

router.route("/").post(protect, validateNotification, createNotification);

router.route("/mark-read/:id").patch(protect, markNotificationRead);

router.route("/").get(protect, getNotifications);

module.exports = router;
