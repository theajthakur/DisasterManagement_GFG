const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  imagePath: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
