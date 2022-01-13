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
  },
  end: {
    type: Date,
    required,
    validate: {
      validator: (end) => end > this.start,
      message: "'end' time must come after 'start' time",
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "paid"],
    default: "pending",
  },
});

module.exports = Request = mongoose.model("Request", requestSchema);
