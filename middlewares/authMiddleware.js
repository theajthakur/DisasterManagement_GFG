const jwt = require("jsonwebtoken");

// Middleware to verify JWT stored in cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get the token from the cookie

  if (!token) {
    return res.json({ status: "error", message: "No token found in cookies!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ status: "error", message: "Invalid token!" }); // If token is invalid
    }

    req.user = decoded; // Store the decoded token data in the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
