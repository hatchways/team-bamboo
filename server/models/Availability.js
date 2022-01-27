const mongoose = require("mongoose");

const availableDaySchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  available_day: {
    type: String,
    required: true,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri"]
  },
  start_hour: {
    type: Number,
    required: true,
    min: 1,
    max: 24
  },
  end_hour: {
    type: Number,
    required: true,
    validate: {
      validator: function (endHour) {
        return endHour >= this.start_hour && endHour <= 24;
      }
    }
  },
  start_min: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  end_min: {
    type: Number,
    required: true,
    validate: {
      validator: function (endMin) {
        if (this.end_hour === this.start_hour) {
          return endMin > this.start_min;
        }
        return endMin >= 0 && endMin < 60;
      }
    }
  },
  isActive: { type: Boolean, default: false }
});

availableDaySchema.pre("save", async function (next) {
  try {
    const previousActiveDay = await mongoose.models["Availability"].findOne({
      isActive: true
    });
    if (previousActiveDay) {
      throw new Error("There is already an active schedule");
    }
    next();
  } catch (error) {
    throw error;
  }
});

module.exports = Avalability = mongoose.model(
  "Availability",
  availableDaySchema
);
