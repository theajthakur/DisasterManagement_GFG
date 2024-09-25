// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Set storage location and renaming logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads")); // Store files in /public/uploads
  },
  filename: (req, file, cb) => {
    const randomId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Get the original file extension
    cb(null, randomId + ext); // Save the file as a random ID + extension
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
