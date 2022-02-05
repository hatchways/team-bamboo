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
    availableTime: availableDaySchema
  },
  tue: {
    availableTime: availableDaySchema
  },
  wed: {
    availableTime: availableDaySchema
  },
  thu: {
    availableTime: availableDaySchema
  },
  fri: {
    availableTime: availableDaySchema
  },
  sat: {
    availableTime: availableDaySchema
  },
  sun: {
    availableTime: availableDaySchema
  }
});

const availabilitySchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  activeSchedule: {
    type: Boolean,
    required: true,
    default: false
  },
  availability: availableWeekSchema
});

module.exports = Avalability = mongoose.model(
  "Availability",
  availabilitySchema
);
