const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { getAllConversations } = require("../controllers/conversation");

router.route("/").get(protect, getAllConversations);

module.exports = router;
