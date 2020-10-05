const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/tasks");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    return res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = eval(req.query.completed);
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
        match,
      })
      .execPopulate();
    return res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    return res.send(task);
  } catch (e) {
    res.send(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdates = ["completed", "description"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((key) => allowedUpdates.includes(key));
  const _id = req.params.id;
  try {
    if (!isValidOperation) return res.status(500).send("Invalid operation!");
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    return res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
