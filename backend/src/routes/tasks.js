const express = require("express");
const { v4: uuidv4 } = require("uuid");
const store = require("../store");

const router = express.Router();

// GET /tasks
router.get("/", (req, res) => {
  res.json(store.getAll());
});

// POST /tasks
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required." });
  }

  const task = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  store.create(task);
  res.status(201).json(task);
});

// PATCH /tasks/:id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;

  const existing = store.getById(id);
  if (!existing) {
    return res.status(404).json({ error: "Task not found." });
  }

  const changes = {};
  if (typeof completed === "boolean") changes.completed = completed;
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Title must be a non-empty string." });
    }
    changes.title = title.trim();
  }

  const updated = store.update(id, changes);
  res.json(updated);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleted = store.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.status(204).send();
});

module.exports = router;
