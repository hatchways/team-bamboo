const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  markNotificationRead,
  getAllNotifications,
} = require("../controllers/notification");

// May need to create middleware to further protect the create notification route. Maybe some sort of role middleware. Or possibly implement with socket.io instead.
router.route("/create").post(protect, createNotification);

router.route("/mark-read").post(protect, markNotificationRead);

// Implement a way to filter the notification based off of received query parameters.
/*
 query params
 1.read -> true, false or undefined,
*/
router.route("/all").get(protect, getAllNotifications);

module.exports = router;
