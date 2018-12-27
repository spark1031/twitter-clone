const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	handle: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

//first argument ('users') is a string of what we want our model to be called
//second argument (UserSchema) is the schema we want to pass in
const User = mongoose.model('users', UserSchema);

module.exports = User;

//test our model is working as expected by importing it into app.js
