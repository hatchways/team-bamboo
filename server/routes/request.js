const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getRequests,
  createRequest,
  updateRequestStatus,
} = require("../controllers/request");

const { payForRequest } = require("../controllers/stripe");

router.route("/").get(protect, getRequests);
router.route("/").post(protect, createRequest);
router.route("/:requestId").patch(protect, updateRequestStatus);
router.route("/:requestId/pay").get(protect, payForRequest);

module.exports = router;
