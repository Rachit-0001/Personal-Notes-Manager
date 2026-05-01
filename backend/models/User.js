// FILE: backend/models/User.js
// This defines what a User looks like in our database

const mongoose = require("mongoose");

// Create a schema (blueprint) for users
const userSchema = new mongoose.Schema({
  // User's name
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // User's email - must be unique
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  // Hashed password (we never store plain text passwords)
  password: {
    type: String,
    required: true,
  },

  // When the user signed up
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model so we can use it in other files
module.exports = mongoose.model("User", userSchema);
