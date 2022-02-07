const Availability = require("../models/Availability");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route GET /availability
// @desc get all schedule
// @access Private
exports.getSchedules = asyncHandler(async (req, res) => {
  const schedules = await Availability.find({ sitterId: req.user.id });
  res.status(200).json({ success: { schedules } });
});

// @route GET /availability/:scheduleId
// @desc get a schedule
// @access Private
exports.getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await Availability.findById(req.params.scheduleId);
  if (schedule) {
    res.status(200).json({ success: { schedule } });
  } else {
    res.status("404");
    throw new Error("Schedule not found");
  }
});

// @route POST /availability
// @desc create a schedule
// @access Private
exports.addSchedule = asyncHandler(async (req, res) => {
  const { availability } = req.body;
  const schedule = new Availability({
    sitterId: req.user.id,
    availability
  });
  const createdSchedule = await schedule.save();
  res.status(201).json({ success: { createdSchedule } });
});

// @route GET /availability/active
// @desc get active schedule
// @access Private
exports.getActiveSchedule = asyncHandler(async (req, res) => {
  const activeSchedule = await Availability.find({ isActive: true });
  if (activeSchedule) {
    res.status(200).json({
      success: {
        activeSchedule
      }
    });
  } else {
    res.send("No schedule is active yet.");
  }
});

// @route PUT /availability/:scheduleId/active
// @desc set a schedule to active
// @access Private
exports.setScheduleActive = asyncHandler(async (req, res) => {
  const alreadyActive = await Availability.findOne({ isActive: true });
  if (alreadyActive) {
    res.status(400).send("There has been already an active schedule.");
  } else {
    const profile = await Profile.findOne({ userId: req.user.id });
    const schedule = await Availability.findById(req.params.scheduleId);
    if (schedule && profile) {
      schedule.isActive = true;
      const updatedSchedule = await schedule.save();
      profile.activeSchedule = schedule._id;
      await profile.save();
      res.status(201).json({ success: { updatedSchedule } });
    }
  }
});
