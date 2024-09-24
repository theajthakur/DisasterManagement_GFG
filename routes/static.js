const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.user) return res.render("weather", { login: true });
  res.render("weather");
});

router.get("/feeds", async (req, res) => {
  res.render("feeds");
});

router.get("/about", async (req, res) => {
  res.render("about");
});

module.exports = router;
