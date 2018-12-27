const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//to import User model, we must also import mongoose
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

//now we can config our passport options
const options = {};
//define where we are getting our json web tokens from
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

//when we ask passport to authenicate a user, 
//calling done() ensures passport does not just hang but actually gives us a response when it's done authenticating
module.exports = passport => {
	passport.use(new JwtStrategy(options, (jwt_payload, done) => {
		// console.log(jwt_payload);
		// done();
		User.findById(jwt_payload.id)
			.then(user => {
				if (user) {
					//return the user the frontend
					return done(null, user);
				}
				//return false since there is no user
				return done(null, false);
			})
			.catch(err => console.log(err));
	}));
};
