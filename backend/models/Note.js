// FILE: backend/models/Note.js
// This defines what a Note looks like in our database

const mongoose = require("mongoose");

// Create a schema (blueprint) for notes
const noteSchema = new mongoose.Schema({
  // The title of the note
  title: {
    type: String,
    required: true,
    trim: true,
  },

  // The actual content/body of the note
  content: {
    type: String,
    required: true,
  },

  // Which user this note belongs to
  // This links the note to a user using their MongoDB ID
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // When the note was created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // When the note was last updated
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
