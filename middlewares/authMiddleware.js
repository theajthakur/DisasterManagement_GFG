const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.json({ status: "error", message: "No Token found!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ status: "error", message: "Invalid Token!" }); //if token is invalid
    }

    req.user = decoded; // Store the decoded token data in the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
