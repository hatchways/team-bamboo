const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const required = true;

const requestSchema = new Schema({
  user_id: {
    type: ObjectId,
    ref: "User",
    required,
  },
  sitter_id: {
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
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = Request = mongoose.model("Request", requestSchema);
