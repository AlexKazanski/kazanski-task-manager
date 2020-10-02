const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon!");
// });

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//   res.send("GET requests are disabled")
//   } else {
//     next()
//   }
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});

// const Task = require("./models/tasks");
// const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('5f75c31475967638bf95fd87')
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner);
//   const user = await User.findById('5f732a7280c23f3d72a88dd9')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks);
  
// }
// main()
