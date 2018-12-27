const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');

router.get("/test", (req, res) => res.json({
	msg: "This is the users route"
}));

//the callback is basically our controller
router.post('/register', (req, res) => {
	User.findOne({
			email: req.body.email
		})
		.then(user => {
			if (user) {
				return res.status(400).json({
					email: "A user is already registered with that email"
				});
			} else {
				const newUser = new User({
					handle: req.body.handle,
					email: req.body.email,
					password: req.body.password
				});
				// newUser.save().then(user => res.send(user)).catch(err => res.send(err));
				//use the salt generated, to hash our password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
						if (err) throw err;
						newUser.password = hashedPassword;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err))
					});
				});
			}
		});
});

router.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	//User.find returns an array of objects, User.findOne just returns the object
	User.findOne({
			email
		})
		.then(user => {
			if (!user) {
				//let frontend know that the user does not exist
				return res.status(404).json({
					email: "This user does not exist."
				});
			}
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						res.json({
							msg: "Success"
						});
					} else {
						return res.status(400).json({
							password: "Password was incorrect."
						});
					}
				});
		});
});

//we want to give the client back a jwt that will allow that user to stay logged in during their session
//  this requires a secret key (must be unique, difficult to guess, create in keys.js file)
//    this secret key will be used to sign jwts (so we need to import it into this file - const keys)
//  we cross check the secret key and the jwt and if they match up then we know the user is logged in


module.exports = router;
