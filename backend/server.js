// FILE: backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Test route (optional)
app.get("/api", (req, res) => {
  res.json({ message: "Notes Manager API is running!" });
});

module.exports = app;