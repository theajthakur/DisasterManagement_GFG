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
  if (!disaster) return res.redirect("/feeds");
  return res.render("disaster", { disaster: disaster });
});

router.get("/about", async (req, res) => {
  res.render("about");
});

module.exports = router;
