const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getAllConversations,
  createNewConversation,
} = require("../controllers/conversation");
const { getAllMessages, sendMessage } = require("../controllers/message");
const {
  validateConversationId,
  validateMessageData,
  validateGetMessagesQuery,
  validateOtherUserId,
} = require("../validate");

router.route("/").get(protect, getAllConversations);
router.route("/").post(protect, validateOtherUserId, createNewConversation);

router
  .route("/:id/messages")
  .get(protect, validateGetMessagesQuery, getAllMessages);
router.route("/:id/messages").post(protect, validateMessageData, sendMessage);

module.exports = router;
