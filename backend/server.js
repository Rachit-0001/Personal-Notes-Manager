// FILE: backend/server.js
// This is the main entry point for our backend server

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create the express app
const app = express();

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse incoming JSON requests

// Routes
// All auth routes (signup, login) are at /api/
app.use("/api", require("./routes/auth"));

// All notes routes are at /api/notes
app.use("/api/notes", require("./routes/notes"));

// Simple home route to test if server is running
app.get("/", (req, res) => {
  res.json({ message: "Notes Manager API is running!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
module.exports = app;