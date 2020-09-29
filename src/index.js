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

