// State Management Utility
const initialUsers = [
  { username: "user", password: "user123", role: "user" },
  { username: "admin", password: "admin123", role: "admin" }
];

function initializeApp() {
  if (!localStorage.getItem("accounts")) {
    localStorage.setItem("accounts", JSON.stringify(initialUsers));
  }
}

// Ensure the app is initialized on load
window.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});
