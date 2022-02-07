const mongoose = require("mongoose");

function formatDate(time) {
  const hour = time.getHours();
  const min = time.getMinutes();
  return new Date(0, 0, 0, hour, min, 0);
}

const availableDaySchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  start: {
    type: Date,
    set: formatDate
  },
  end: {
    type: Date,
    set: formatDate,
    validate: {
      validator: function (endTime) {
        return endTime > this.start;
      }
    }
  }
});

const availableWeekSchema = new mongoose.Schema({
  mon: {
    type: Date,
    availableTime: availableDaySchema
  },
  tue: {
    type: Date,
    availableTime: availableDaySchema
  },
  wed: {
    type: Date,
    availableTime: availableDaySchema
  },
  thu: {
    type: Date,
    availableTime: availableDaySchema
  },
  fri: {
    type: Date,
    availableTime: availableDaySchema
  },
  sat: {
    type: Date,
    availableTime: availableDaySchema
  },
  sun: {
    type: Date,
    availableTime: availableDaySchema
  }
});

const availabilitySchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  availability: availableWeekSchema
});

module.exports = Avalability = mongoose.model(
  "Availability",
  availabilitySchema
);
