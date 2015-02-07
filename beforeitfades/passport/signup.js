var LocalStrategy   = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Merchant = mongoose.model('Merchant');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateMerchant = function(){
                // find a user in Mongo with provided username
                Merchant.findOne({ 'email' :  username }, function(err, merchant) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (merchant) {
                        console.log('Merchant already exists with email: '+username);
                        return done(null, false, req.flash('message','Merchant Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        req.password = createHash(req.password);
                        var newMerchant = new Merchant(req.body);

                        // set the user's local credentials
                        // newMerchant.email = username;
                        // newMerchant.password = createHash(password);
                        // newMerchant.email = req.param('email');
                        // newUser.firstName = req.param('firstName');
                        // newUser.lastName = req.param('lastName');

                        // save the user
                        newMerchant.save(function(err) {
                            if (err){
                                console.log('Error in Saving merchant: '+err);  
                                throw err;  
                            }
                            console.log('Merchant Registration succesful');    
                            return done(null, newMerchant);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateMerchant);
        })
    );

    passport.use('signupUser', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'deviceId' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('Merchant already exists with email: '+username);
                        return done(null, false, req.flash('message','Merchant Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        req.password = createHash(req.password);
                        var newUser = new User(req.body);

                        // set the user's local credentials
                        // newMerchant.email = username;
                        // newMerchant.password = createHash(password);
                        // newMerchant.email = req.param('email');
                        // newUser.firstName = req.param('firstName');
                        // newUser.lastName = req.param('lastName');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;  
                            }
                            console.log('User Registration succesful');
                            return done(null, newMerchant);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(109), null);
    };

};