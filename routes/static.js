const express = require("express");
const router = express.Router();
const axios = require("axios");
const Disaster = require("../models/disaster");
const {
  getLocationDetails,
  getOAuthToken,
} = require("../controllers/mapMyIndia");

router.get("/", async (req, res) => {
  const user = req.user;
  console.log(user);
  if (user) return res.render("weather", { login: true, user });
  return res.render("weather");
});

router.get("/feeds", async (req, res) => {
  const user = req.user;
  const data = await Disaster.find({});
  if (user) return res.render("feeds", { login: true, user, data });
  return res.render("feeds", { login: false, data });
});

router.get("/feeds/:id", async (req, res) => {
  const tarId = req.params.id;
  if (!tarId) return res.end("Invalid Request!");
  const disaster = await Disaster.findOne({ _id: tarId });
  if (!disaster) return res.end("");
  const searchUrl = `https://atlas.mapmyindia.com/api/places/eloc?eloc=${encodeURIComponent(
    disaster.eLoc
  )}`;
  const coords = {
    lat: "28.612964", // Default values
    lng: "77.229463",
  };

  try {
    const token = await getOAuthToken();
    console.log(token);
    const response = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Access latitude and longitude from response.data
    if (response.data && response.data.latitude && response.data.longitude) {
      coords.lat = response.data.latitude;
      coords.lng = response.data.longitude;
    } else {
      console.log("Latitude and Longitude not found in response.");
    }
  } catch (error) {
    console.log(`Error Occurred eLOC:${disaster.eloc} error:${error.message}!`);
  }

  disaster.coords = coords;
  return res.render("disaster", { disaster: disaster });
});

router.get("/about", async (req, res) => {
  res.render("about");
});

module.exports = router;
