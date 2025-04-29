const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all users
router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { first_name, last_name, email, avatar } = req.body;

  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO users (first_name, last_name, email, avatar) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, avatar],
    );
    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - Update user
router.put("/:id", async (req, res) => {
  const { first_name, last_name, email, avatar } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, avatar = ? WHERE id = ?",
      [first_name, last_name, email, avatar, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
