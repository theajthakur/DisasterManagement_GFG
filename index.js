const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const authRouter = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth/", authRouter);

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
