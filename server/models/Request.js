const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const required = true;

const requestSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required,
  },
  sitterId: {
    type: ObjectId,
    ref: "User",
    required,
  },
  start: {
    type: Date,
    required,
    validate: {
      validator: function (start) {
        const startMidnight = new Date(start);
        const currentMidnight = new Date();

        startMidnight.setHours(0, 0, 0, 0);
        currentMidnight.setHours(0, 0, 0, 0);
        return startMidnight >= currentMidnight;
      },
      message: "'start' must be current day or future",
    },
  },
  end: {
    type: Date,
    required,
    validate: {
      validator: function (end) {
        return end > this.start;
      },
      message: "'end' time must come after 'start' time",
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "paid"],
    default: "pending",
  },
});

module.exports = Request = mongoose.model("Request", requestSchema);
