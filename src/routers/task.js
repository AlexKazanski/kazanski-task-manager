const express = require("express");
const Task = require("../models/tasks");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    return res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();
    return res.send(task);
  } catch (e) {
    res.send(500).send(e);
  }
});

router.patch("/task/:id", async (req, res) => {
  const allowedUpdates = ["completed", "description"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((key) => allowedUpdates.includes(key));
  const _id = req.params.id;
  try {
    if (!isValidOperation) return res.status(500).send("Invalid operation!");
    const task = await Task.findById(_id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    return res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
