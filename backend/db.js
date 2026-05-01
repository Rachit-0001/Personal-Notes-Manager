// FILE: backend/db.js
// This file connects our app to MongoDB using mongoose

const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Try to connect using the URI from our .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

module.exports = connectDB;
