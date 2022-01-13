const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getRequests,
  createRequest,
  updateRequestStatus,
} = require("../controllers/request");

router.route("/").get(protect, getRequests);
router.route("/").post(protect, createRequest);
router.route("/:requestId").put(protect, updateRequestStatus);

module.exports = router;
