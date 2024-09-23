const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
