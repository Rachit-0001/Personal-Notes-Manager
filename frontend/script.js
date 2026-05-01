// FILE: frontend/script.js
// Shared utility functions used across all pages

// ---- CHANGE THIS TO YOUR BACKEND URL ----
// When running locally: http://localhost:5000/api
// When deployed on Vercel: https://your-backend.vercel.app/api
const API_URL = "http://localhost:5000/api";

// Show an alert message box
// type can be "error" or "success"
function showAlert(element, message, type) {
  element.textContent = message;
  element.className = `alert alert-${type} show`;
}

// Hide an alert message box
function hideAlert(element) {
  element.className = "alert";
  element.textContent = "";
}

// Format a date like "May 2, 2026"
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Escape HTML to prevent XSS attacks
// This stops malicious code from running if someone types HTML in a note
function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// Escape text for use inside JS template literals (backticks)
// Handles quotes and backticks so the note title/content doesn't break the HTML
function escapeForJs(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}
