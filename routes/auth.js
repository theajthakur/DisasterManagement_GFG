const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.json(req.body);
});

router.post("/register", (req, res) => {
  const { name, email, mobile, password } = req.body;

  res.json(req.body);
});

module.exports = router;
