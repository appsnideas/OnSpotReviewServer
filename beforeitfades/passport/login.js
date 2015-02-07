var LocalStrategy = require('passport-local').Strategy;
var mongoose =  require('mongoose');
var Merchant = mongoose.model('Merchant');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {
		// check in mongo if a user with username exists or not
		Merchant.findOne({ 'email' : username },
		function(err, merchant) {
		// In case of any error, return using the done method
		if (err)
			return done(err);
		// Username does not exist, log the error and redirect back
		if (!merchant){
			console.log('User Not Found with username '+username);
			return done(null, false, req.flash('message', 'User Not found.'));
		}
		// User exists but wrong password, log the error
		if (!isValidPassword(merchant, password)){
			console.log('Invalid Password');
			return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
		}
		// User and password both match, return user from done method
		// which will be treated like success
		return done(null, merchant);
		});
	}));

	passport.use('loginUser', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {
		// check in mongo if a user with username exists or not
		User.findOne({ 'deviceId' : username },
		function(err, user) {
		// In case of any error, return using the done method
		if (err)
			return done(err);
		// Username does not exist, log the error and redirect back
		if (!user){
			console.log('User Not Found with username '+username);
			return done(null, false, req.flash('message', 'User Not found.'));
		}
		// User exists but wrong password, log the error
		if (!isValidPassword(user, password)){
			console.log('Invalid Password');
			return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
		}
		// User and password both match, return user from done method
		// which will be treated like success
		return done(null, user);
		});
	}));

	var isValidPassword = function(merchant, password){
		return bCrypt.compareSync(password, merchant.password);
	};
};