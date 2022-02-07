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
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  if (profile.activeSchedule) {
    const populatedProfile = await profile.populate("activeSchedule");
    res
      .status(200)
      .json({ success: { scheduleDetails: populatedProfile.activeSchedule } });
  } else {
    res.send("No schedule is active yet.");
  }
});

// @route PUT /availability/:scheduleId/active
// @desc set a schedule to active
// @access Private
exports.setScheduleActive = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (profile) {
    const schedule = await Availability.findById(req.params.scheduleId);
    profile.activeSchedule = schedule._id;
    await profile.save();
    res.status(201).send("The schedule has been set active!");
  } else {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
});
