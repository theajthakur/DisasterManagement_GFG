const axios = require("axios");
const express = require("express");
const router = express.Router();
const { getOAuthToken } = require("../controllers/mapMyIndia");

router.get("/address/", async (req, res) => {
  const query = req.query.q;
  const searchUrl = `https://atlas.mapmyindia.com/api/places/search/json?query=${encodeURIComponent(
    query
  )}`;

  try {
    // Get OAuth token
    const token = await getOAuthToken();

    // Make request to MapmyIndia API
    const response = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Return the response data
    return res.json(response.data);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: error.message });
  }
});

router.get("/coords", async (req, res) => {
  const { lat, lng } = req.query;
  const searchUrl = `https://apis.mappls.com/advancedmaps/v1/b9aa7fa83d2a7a2631818d555c8b1d7d/rev_geocode?lat=${lat}&lng=${lng}`;
  const response = await axios.get(searchUrl);
  return res.json(response.data);
});
module.exports = router;
