const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  validateNotification,
  validateMarkNotification,
} = require("../validate");
const {
  createNotification,
  markNotificationRead,
  getNotifications,
} = require("../controllers/notification");

router.route("/").post(protect, validateNotification, createNotification);

router
  .route("/mark-read/:id")
  .patch(protect, validateMarkNotification, markNotificationRead);

router.route("/").get(protect, getNotifications);

module.exports = router;
