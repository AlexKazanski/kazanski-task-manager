const mongoose = require("mongoose");
const validator = require("validator");

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
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid!");
    },
  },
  password: {
    type: String,
    min: 7,
    required: true,
    trim: true,
    validate(value) {
      if (value.includes("password"))
        throw new Error("Password cant contain 'password'!");
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number!");
    },
  },
});

const me = new User({
  name: "     Alexander James Kazanski        ",
  age: 28,
  email: "TESTALPHA@GMAIL.COM",
  password: "arandomhashwithalonglength",
});

me.save()
  .then((me) => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

new Task({
  description: "  This is the description   ",
})
  .save()
  .then((task) => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
