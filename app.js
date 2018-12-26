//import mongoose
const mongoose = require('mongoose');

//creates new Express server
const express = require("express");
const app = express();

//import my key
const db = require('./config/keys').mongoURI;
//connecrt to MongoDB using Mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//sets up basic route so we can render info on page
app.get("/", (req, res) => res.send("G'day Matey!!"));

//determine which port to run server on (process.env.PORT is what we need our app to run on for deploying to Heroku)
const port = process.env.PORT || 5000;

//tell Express to start a socket & listen for connections on path
app.listen(port, () => console.log(`Server is running on port ${port}`));