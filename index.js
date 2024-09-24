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
app.use("/web/", authMiddleware);

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
