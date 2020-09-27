require("../src/db/mongoose");
const Task = require("../src/models/tasks");

Task.findByIdAndDelete("5f69e3191a3db12bb69864af")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((document) => {
    console.log(document);
  })
  .catch((e) => {
    console.log(e);
  });
