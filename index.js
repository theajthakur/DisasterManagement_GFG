const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();
const authRouter = require("./routes/auth");
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth/", authRouter);
app.use("/web/", authMiddleware);

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
