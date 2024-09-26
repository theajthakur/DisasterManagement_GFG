// controllers/disasterController.js
const Disaster = require("../models/disaster");

// Handle form submission
exports.createDisaster = async (req, res) => {
  try {
    const { name, eloc, locationName } = req.body;

    // Create a new disaster entry
    const disaster = new Disaster({
      name,
      eLoc: eloc,
      locationName,
      picture: req.file.filename,
      uploadedBy: req.user.user._id,
    });

    // Save the record in the database
    await disaster.save();

    // Redirect to a success page (or render the same form with a success message)
    res.redirect("/feeds");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save disaster" });
  }
};

// Render the form view
exports.renderForm = (req, res) => {
  res.render("disasterForm");
};
