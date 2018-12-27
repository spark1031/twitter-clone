//creates new Express server
const express = require("express");
const app = express();
//import mongoose
const mongoose = require('mongoose');
//import my key for my database
const db = require('./config/keys').mongoURI;
//import users and tweets routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User');
//import body parser to parse the JSON we send to our frontend (allows us to use Postman)
const bodyParser = require('body-parser');
const passport = require('passport');


//connect to MongoDB using Mongoose
mongoose
	.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
//tells our app to respond to json requests
//urlencoded - our app will also respond to requests from other software, like Postman
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

//sets up basic route so we can render info on page
app.get("/", (req, res) => {
	const user = new User({
		handle: "sparky",
		email: "sujinpark1031@gmail.com",
		password: "password"
	});
	user.save();
	res.send("G'day Matey!!");
});
app.use("/api/users", users);
app.use("/api/tweets", tweets);


//determine which port to run server on (process.env.PORT is what we need our app to run on for deploying to Heroku)
const port = process.env.PORT || 5000;

//tell Express to start a socket & listen for connections on path
app.listen(port, () => console.log(`Server is running on port ${port}`));
