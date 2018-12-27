const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

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


module.exports = router;
