const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId, //user objectId
		ref: 'users' //name of the model we want to associate this with
	},
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Tweet = mongoose.model('tweet', TweetSchema);
module.exports = Tweet;
