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
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
      },
      required: true,
    },
    description: {
      type: String,
      default: "",
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
