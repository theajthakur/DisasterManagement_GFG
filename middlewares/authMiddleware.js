const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.redirect("/auth/login"); // Redirect to login if no token is found
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect("/auth/login"); // Redirect to login if token is invalid
    }

    req.user = decoded; // Store the decoded token data in the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
