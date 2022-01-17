const mongoose = require("mongoose");

const imgUrlSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = ImageUrl = mongoose.model("imageUrl", imgUrlSchema);