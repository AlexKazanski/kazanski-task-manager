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

    db.collection("users").findOne(
      { _id: new ObjectID("5f5b696f12e6285a9928990b") },
      (error, user) => {
        if (error) return console.log("Unable to fetch!");
        console.log(user);
      }
    );

    db.collection("users")
      .find({ age: 27 })
      .toArray((error, results) => {
        if (error) return console.log(error);

        console.log(results);
      });

    db.collection("users")
      .find({ age: 27 })
      .count((error, count) => {
        if (error) return console.log(error);

        console.log(count);
      });
  }
);
