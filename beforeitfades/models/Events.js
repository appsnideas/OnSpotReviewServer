var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: String,
	type: String,
	date: {type: Date},
	description: String,
	website: String,
	ticketingUrl: [String],
	questionstoAsk: [String],
	street: String,
	city: String,
	state: String,
	phoneNumber: [String],
	latlon: String,
	merchant: {type: mongoose.Schema.Types.ObjectId, ref: 'Merchant'},
	eventreviews: [{type:mongoose.Schema.Types.ObjectId, ref: 'EventReviews'}]
});

mongoose.model('Event', EventSchema);