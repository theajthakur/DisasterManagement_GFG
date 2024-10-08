const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "No user found with this email." });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password." });
    }
    const token = jwt.sign({ user }, JWT_SECRET);
    // If login is successful

    res.cookie("token", token, {
      httpOnly: true, // Helps mitigate XSS attacks by restricting access to the cookie
      secure: process.env.NODE_ENV === "production", // Use Secure flag only in production (HTTPS)
      maxAge: 3600000, // 1 hour
    });

    res.json({
      status: "success",
      message: "Login Successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const handleRegister = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const user = await User.create({ name, email, mobile, password });
    const token = jwt.sign({ user }, JWT_SECRET);
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true, // Helps mitigate XSS attacks by restricting access to the cookie
        secure: process.env.NODE_ENV === "production", // Use Secure flag only in production (HTTPS)
        maxAge: 3600000, // 1 hour
      })
      .json({ status: "success", message: "User created successfully!", user });

    // If login is successful
    // return res.render("/", {
    //   login: false,
    //   reg_msg: "Account Created Successfully, Please login!",
    // });
  } catch (error) {
    console.log(error);

    // Handle different types of errors
    if (error.name === "ValidationError") {
      // Handle validation errors
      return res.status(400).json({ status: "error", message: error.message });
    } else if (error.code === 11000) {
      // Handle duplicate key errors (e.g., email or mobile)
      const field = Object.keys(error.keyPattern)[0]; // Get the field that caused the duplicate key error
      return res.status(400).json({
        status: "error",
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists.`,
      });
    } else {
      // Handle general errors
      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
};

module.exports = { handleLogin, handleRegister };
