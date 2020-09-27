require("../src/db/mongoose");
const Task = require("../src/models/tasks");

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndRemove(id);
  const count = Task.countDocuments({ completed: true });
  return count
};

deleteTaskAndCount("<id>")
  .then((tasks) => {
    console.log(tasks);
  })
  .catch((e) => {
    console.log(e);
  });
