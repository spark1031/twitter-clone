//import mongoose
const mongoose = require('mongoose');
//creates new Express server
const express = require("express");
//import my key
const db = require('./config/keys').mongoURI;
//import users and tweets routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
//import body parser to parse the JSON we send to our frontend
const bodyParser = require('body-parser');


const app = express();
//connect to MongoDB using Mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//sets up basic route so we can render info on page
app.get("/", (req, res) => res.send("G'day Matey!!"));
app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//determine which port to run server on (process.env.PORT is what we need our app to run on for deploying to Heroku)
const port = process.env.PORT || 5000;

//tell Express to start a socket & listen for connections on path
app.listen(port, () => console.log(`Server is running on port ${port}`));