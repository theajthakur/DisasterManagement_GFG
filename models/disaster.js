// models/disaster.js
const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    eLoc: {
      type: String,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    picture: {
      type: String, // Store the filename
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Disaster = mongoose.model("Disaster", disasterSchema);

module.exports = Disaster;
