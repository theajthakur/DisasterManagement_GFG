// routes/disasterRoutes.js
const express = require("express");
const router = express.Router();
const disasterController = require("../controllers/disaster");
const upload = require("../middlewares/upload"); // Import Multer upload middleware

router.get("/disaster/new", disasterController.renderForm);

// Route to handle form submission and file upload
router.post(
  "/disaster",
  upload.single("picture"),
  disasterController.createDisaster
);

module.exports = router;
