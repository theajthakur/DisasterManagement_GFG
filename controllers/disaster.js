// controllers/disasterController.js
const Disaster = require("../models/disaster");

// Handle form submission
exports.createDisaster = async (req, res) => {
  try {
    const { name, locationCoords, locationName } = req.body;

    // Split locationCoords into latitude and longitude
    const [lat, lng] = locationCoords.split(",");

    // Create a new disaster entry
    const disaster = new Disaster({
      name,
      locationCoords: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      locationName,
      picture: req.file.filename, // Filename stored after uploading
    });

    // Save the record in the database
    await disaster.save();

    // Redirect to a success page (or render the same form with a success message)
    res.redirect("/feeds");
  } catch (error) {
    res.status(500).json({ error: "Failed to save disaster" });
  }
};

// Render the form view
exports.renderForm = (req, res) => {
  res.render("disasterForm");
};
