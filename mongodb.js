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

    db.collection("tasks").findOne(
      { _id: new ObjectID("5f5b6aa9e7d3c362eb3ba505") },
      (error, result) => {
        if (error) return console.log(error);
        console.log(result);
      }
    );
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, results) => {
        if (error) return console.log(error);
        console.log(results);
      });
  }
);
