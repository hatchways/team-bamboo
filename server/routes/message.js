const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getAllMessages, sendMessage } = require("../controllers/message");
const { validateConversationId, validateMessageData } = require("../validate");

router.route("/:convoId").get(protect, validateConversationId, getAllMessages);
router.route("/send").post(protect, validateMessageData, sendMessage);

module.exports = router;
