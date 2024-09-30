const mongoose = require("mongoose");
const Disaster = require("../models/disaster");
// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove whitespace from both ends
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true, // Ensure mobile number is unique
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("remove", async function (next) {
  await Disaster.deleteMany({ uploadedBy: this._id });
  console.log(
    `${this.name} has been deleted with all its corresponding Disasters!!`
  );
  next();
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
