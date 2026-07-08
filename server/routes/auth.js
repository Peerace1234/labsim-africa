const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Missing email or password" });

    const exists = db.getUserByEmail(email);
    if (exists) return res.status(409).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = db.createUser(name || "", email, hash);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ user, token });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).json({
      error:
        "Signup failed: " + (err && err.message ? err.message : "server error"),
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Missing email or password" });

    const userRow = db.getUserByEmail(email);
    if (!userRow) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, userRow.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const user = { id: userRow.id, name: userRow.name, email: userRow.email };
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ user, token });
  } catch (err) {
    console.error("Login failed", err);
    res.status(500).json({
      error:
        "Login failed: " + (err && err.message ? err.message : "server error"),
    });
  }
});

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No auth" });
  const token = auth.replace("Bearer ", "");
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/profile", authMiddleware, (req, res) => {
  const user = db.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});

module.exports = router;
