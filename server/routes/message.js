const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getAllMessages, sendMessage } = require("../controllers/message");

router.route("/:convoId").get(protect, getAllMessages);
router.route("/send").post(protect, sendMessage);

module.exports = router;
