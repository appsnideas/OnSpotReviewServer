var mongoose= require("mongoose");

var MerchantSchema = new mongoose.Schema({
	name: String,
	contactName: String,
	phoneNumber: [String],
	email: String,
	password: String,
	description: String,
	address: String,
	city: String,
	state: String,
	events: [{type:mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

mongoose.model('Merchant', MerchantSchema);