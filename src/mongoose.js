const mongoose = require("mongoose");

const databaseName = "task-manager-api";
const connectionURL = `mongodb://root:password123@127.0.0.1:27017/${databaseName}`;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({
  name: "Alexander",
  age: '30alpha',
});

me.save()
  .then((me) => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
