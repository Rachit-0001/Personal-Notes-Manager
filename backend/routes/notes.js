// FILE: backend/routes/notes.js
// Handles all note CRUD operations (Create, Read, Update, Delete)

const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

// All routes here require the user to be logged in
// We apply authMiddleware to every route in this file
router.use(authMiddleware);

// GET /api/notes
// Get all notes for the logged-in user
router.get("/", async (req, res) => {
  try {
    // req.user.userId comes from the JWT token (set in authMiddleware)
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.log("Get notes error:", error);
    res.status(500).json({ message: "Could not fetch notes." });
  }
});

// POST /api/notes
// Create a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const newNote = new Note({
      title,
      content,
      userId: req.user.userId, // Link this note to the logged-in user
    });

    await newNote.save();
    res.status(201).json({ message: "Note created!", note: newNote });
  } catch (error) {
    console.log("Create note error:", error);
    res.status(500).json({ message: "Could not create note." });
  }
});

// PUT /api/notes/:id
// Update an existing note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    // Find the note, but also make sure it belongs to this user
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found or you don't have permission." });
    }

    // Update the fields
    note.title = title;
    note.content = content;
    note.updatedAt = Date.now();

    await note.save();
    res.json({ message: "Note updated!", note });
  } catch (error) {
    console.log("Update note error:", error);
    res.status(500).json({ message: "Could not update note." });
  }
});

// DELETE /api/notes/:id
// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    // Make sure the note belongs to this user before deleting
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found or you don't have permission." });
    }

    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    console.log("Delete note error:", error);
    res.status(500).json({ message: "Could not delete note." });
  }
});

module.exports = router;
