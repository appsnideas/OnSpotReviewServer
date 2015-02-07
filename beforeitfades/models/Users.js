var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: String,
	phoneNumber: [String],
	email: String,
	deviceId: String,
	password: String,
	address: String,
	city: String,
	state: String,
	eventreviews: [{type:mongoose.Schema.Types.ObjectId, ref: 'EventReviews'}]
});

mongoose.model('User', UserSchema);