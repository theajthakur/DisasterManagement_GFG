const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.user;
  console.log(user);
  if (user) return res.render("weather", { login: true, user });
  return res.render("weather");
});

router.get("/feeds", async (req, res) => {
  const user = req.user;
  if (user) return res.render("feeds", { login: true, user });
  res.render("feeds");
});

router.get("/about", async (req, res) => {
  res.render("about");
});

module.exports = router;
