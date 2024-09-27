const axios = require("axios");
const express = require("express");
const router = express.Router();

const apiKey = process.env.WEATHER_API;

router.post("/general", async (req, res) => {
  //   const url =
  //     "https://api.openweathermap.org/data/2.5/weather?q=Orai,in&APPID=f59ab57428bf28c69b34a0c9cb59a283";
  const { lat, lng } = req.body;
  if (!lat || !lng)
    return res.json({ status: "error", message: "Coordinates Missing!" });
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
