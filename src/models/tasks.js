const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

taskSchema.pre('save', async function (next) {
  const task = this;
  if (task.isModified('description')) {
    task.description += "M"
  }
  console.log('running before save!');
  next()
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
