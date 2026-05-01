// FILE: backend/middleware/authMiddleware.js
// This middleware checks if the user is logged in before accessing protected routes

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  // The frontend sends it like: Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided. Please login." });
  }

  // Split "Bearer <token>" and get just the token part
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token format invalid." });
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user info to the request so routes can use it
    req.user = decoded;

    // Move on to the next function (the actual route handler)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
};



module.exports = authMiddleware;
