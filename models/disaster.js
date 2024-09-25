// models/disaster.js
const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    locationCoords: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
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
  },
  { timestamps: true }
);

const Disaster = mongoose.model("Disaster", disasterSchema);

module.exports = Disaster;
