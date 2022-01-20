const mongoose = require("mongoose");

const imgUrlSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
    unique: true
  }
});

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
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
    enum: ['male', 'female', 'other'],
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
    default: null
  },
  photo: {
    type: String,
    default: "",
  },
  uploadedImages: [imgUrlSchema],
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
