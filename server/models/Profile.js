const mongoose = require("mongoose");

const imgUrlSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
    unique: true,
  },
});

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isSitter: {
    type: Boolean,
    required: true,
    default: false,
  },
  isSitter: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  address: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null,
  },
  photo: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    max: 20,
    trim: "",
    default: "",
  },
  coverPhoto: {
    type: String,
    default: "",
  },
  hourlyRate: {
    type: Number,
    validate: [
      function (val) {
        return val > 0;
      },
      "Hourly rate must be a positive number",
    ],
  },
  uploadedImages: [imgUrlSchema],
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
