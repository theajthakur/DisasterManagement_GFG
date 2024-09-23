const mongoose = require("mongoose");

// Replace this with your MongoDB connection string
const mongoURI = "mongodb://localhost:27017/disastermanagement_gfg"; // Local MongoDB
// const mongoURI = 'your-atlas-connection-string'; // MongoDB Atlas

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
