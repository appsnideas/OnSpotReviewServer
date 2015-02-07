var login = require('./login');
var signup = require('./signup');
var mongoose =  require('mongoose');
var Merchant = mongoose.model('Merchant');

module.exports = function(passport){
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(merchant, done) {
		console.log('serializing user: ');console.log(merchant);
		done(null, merchant._id);
	});

	passport.deserializeUser(function(id, done) {
		Merchant.findById(id, function(err, merchant) {
			console.log('deserializing user:',merchant);
			done(err, merchant);
		});
	});

	// Setting up Passport Strategies for Login and SignUp/Registration
	login(passport);
	signup(passport);
};