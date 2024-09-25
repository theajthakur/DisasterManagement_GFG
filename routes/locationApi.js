const axios = require("axios");
const apiUrlRev =
  "https://geocode.maps.co/reverse?lat=&lon=&api_key=66f463b7eb1da139656431uct4d9da3";

const express = require("express");
const router = express.Router();

router.get("/location/", async (req, res) => {
  const query = req.query.q;
  const apiUrlSt = `https://geocode.maps.co/search?q=${query}&api_key=66f463b7eb1da139656431uct4d9da3`;

  try {
    const response = await axios.get(apiUrlSt);
    return res.json(response.data); // Return the response data
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Handle any errors
  }
});
module.exports = router;
