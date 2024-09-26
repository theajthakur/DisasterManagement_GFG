// controllers/disasterController.js
const Disaster = require("../models/disaster");

// Handle form submission
exports.createDisaster = async (req, res) => {
  try {
    const { name, lat, lng, description } = req.body;

    // Create a new disaster entry
    const disaster = new Disaster({
      name,
      locationCoords: {
        lat: lat,
        lng: lng,
      },

      description,
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
