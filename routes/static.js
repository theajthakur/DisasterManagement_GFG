const express = require("express");
const router = express.Router();
const Disaster = require("../models/disaster");
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

router.get("/about", async (req, res) => {
  res.render("about");
});

module.exports = router;
