const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getSchedules,
  setScheduleActive,
  getScheduleById,
  getActiveSchedule,
  addSchedule
} = require("../controllers/availability");

router.route("/").get(protect, getSchedules);
router.route("/active").get(protect, getActiveSchedule);
router.route("/:scheduleId").get(protect, getScheduleById);
router.route("/").post(protect, addSchedule);
router.route("/:scheduleId/active").put(protect, setScheduleActive);
module.exports = router;
