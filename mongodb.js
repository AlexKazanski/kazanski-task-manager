// CRUD create read upate delete

const { MongoClient, ObjectID } = require("mongodb");

const databaseName = "mongodb";
const connectionURL = `mongodb://root:password123@127.0.0.1:27017/?authSource=${databaseName}`;

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to database!");
    console.log("Connected correctly!");

    const db = client.db(databaseName);

    db.collection("tasks")
      .deleteOne({ description: "desc2" })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
