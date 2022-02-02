const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const validateSitter = require("../middleware/validateSitter");
const {
  getSchedules,
  setScheduleActive,
  getScheduleById,
  getActiveSchedule,
  addSchedule
} = require("../controllers/availability");

router.route("/").get(protect, validateSitter, getSchedules);
router.route("/active").get(protect, validateSitter, getActiveSchedule);
router.route("/:scheduleId").get(protect, validateSitter, getScheduleById);
router.route("/").post(protect, validateSitter, addSchedule);
router
  .route("/:scheduleId/active")
  .put(protect, validateSitter, setScheduleActive);
module.exports = router;
