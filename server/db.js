const fs = require("fs");
const path = require("path");

const DB_DIR = process.env.DB_FILE
  ? path.dirname(process.env.DB_FILE)
  : path.join(__dirname, "data");
const USERS_FILE = path.join(DB_DIR, "users.json");

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Load or initialize users
let users = [];
if (fs.existsSync(USERS_FILE)) {
  try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  } catch (e) {
    console.error("Error loading users file:", e);
    users = [];
  }
}

const saveUsers = () => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
};

module.exports = {
  getUserByEmail: (email) => {
    return users.find((u) => u.email === email);
  },

  getUserById: (id) => {
    return users.find((u) => u.id === id);
  },

  createUser: (name, email, passwordHash) => {
    const id = Date.now();
    const user = {
      id,
      name,
      email,
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
    };
    users.push(user);
    saveUsers();
    return user;
  },

  getAllUsers: () => users,
};
