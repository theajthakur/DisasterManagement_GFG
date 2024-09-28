const express = require("express");
const router = express.Router();
const axios = require("axios");
const Disaster = require("../models/disaster");
const {
  getLocationDetails,
  getOAuthToken,
} = require("../controllers/mapMyIndia");

router.get("/logout", (req, res) => {
  req.user = {};
  res.cookie("token", "");
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const user = req.user;
  console.log(user);
  if (user) return res.render("weather", { login: true, user });
  return res.render("weather");
});

router.get("/feeds", async (req, res) => {
  const user = req.user;
  const data = await Disaster.find({}).sort({ createdAt: -1 });
  const conData = {
    login: false,
    data: {},
  };
  if (user) conData.login = true;
  if (data.length > 0) conData.data = data;
  conData.user = user;
  return res.render("feeds", conData);
});

router.get("/feeds/:id", async (req, res) => {
  const tarId = req.params.id;
  const user = req.user;
  const conData = {
    login: false,
  };
  if (user) conData.login = true;
  if (!tarId) return res.end("Invalid Request!");
  const disaster = await Disaster.findOne({ _id: tarId });
  if (!disaster) return res.redirect("/feeds");
  return res.render("disaster", { disaster: disaster, login: conData.login });
});

router.get("/about", async (req, res) => {
  const user = req.user;
  const conData = {
    login: false,
  };
  if (user) conData.login = true;
  res.render("about", conData);
});

router.get("/profile", async (req, res) => {
  const user = req.user;
  const conData = {
    login: false,
  };

  if (user) conData.login = true;
  delete user.user.password;
  if (!user)
    return res.json({
      status: "error",
      messsage: "Please Login to see your profile...",
    });

  try {
    const posts = await Disaster.find({ uploadedBy: user.user._id }).sort({
      createdAt: -1,
    });
    res.render("profile", { user, posts, login: conData.login });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Error Occured!", error: error });
  }
});

router.get("/admin", async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ status: "error", message: "unauthorised!" });
  if (user.user.email == "thakurvijayofficial@gmail.com") {
    const data = await Disaster.find().sort({
      createdAt: -1,
    });

    return res.render("admin", { posts: data });
  } else {
    return res.json({ status: "error", message: "No Permission!" });
  }
});
router.post("/admin/delete", async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ status: "error", message: "unauthorised!" });
  if (user.user.email == "thakurvijayofficial@gmail.com") {
    const postid = req.body.postid;
    if (!postid)
      return res.json({ status: "error", message: "Invalid Request!" });

    try {
      await Disaster.deleteOne({ _id: postid });
      return res.json({ status: "success", message: "Post Deleted!" });
    } catch (error) {}
  }
});
module.exports = router;
