const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const jwt = require("jsonwebtoken");

const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();
const authRouter = require("./routes/auth");
const staticRouter = require("./routes/static");
const locationApiRouter = require("./routes/locationApi");
const weatherApiRouter = require("./routes/weatherApi");
const disasterRoutes = require("./routes/disaster");
const connectDB = require("./config/db");
connectDB();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");

const checkLogin = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decode) => {
    req.user = decode;
  });
  next();
};

app.use("/auth/", authRouter);
app.use("/", checkLogin, staticRouter);
app.use("/api/location", authMiddleware, locationApiRouter);
app.use("/api/weather", weatherApiRouter);
app.use("/", authMiddleware, disasterRoutes);

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
