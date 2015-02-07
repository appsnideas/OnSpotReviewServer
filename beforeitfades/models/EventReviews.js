var mongoose = require('mongoose');

var EventReviewSchema = new mongoose.Schema({
	answers: [{question: String, answer: String}],
	feedback: String,
	event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('EventReview', EventReviewSchema);