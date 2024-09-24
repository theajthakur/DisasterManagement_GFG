const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  res.render("weather", {});
});

router.get("/feeds", async (req, res) => {
  res.render("feeds");
});

router.get("/about", async (req, res) => {
  res.render("about");
});

module.exports = router;
