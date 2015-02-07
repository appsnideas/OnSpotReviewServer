var express = require('express');
var router = express.Router();
var mongoose =  require('mongoose');
var User = mongoose.model('User');
var Merchant = mongoose.model('Merchant');
var Event = mongoose.model('Event');
var EventReview = mongoose.model('EventReview');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

router.param('user', function(req, res, next, id){
	var query = User.findById(id);

	query.exec(function(err, user){
		if(err){return next(err);}

		if(!user){return next(new Error("cant find post!"));}

		req.user = user;
		return next();
	});
});

router.param('merchant', function(req, res, next, id){
	var query = Merchant.findById(id);

	query.exec(function(err, merchant){
		if(err){return next(err);}

		if(!merchant){return next(new Error("cant find post!"));}

		req.merchant = merchant;
		return next();
	});
});

router.param('event', function(req, res, next, id){
	var query = Event.findById(id);

	query.exec(function(err, event){
		if(err){return next(err);}

		if(!event){return next(new Error("cant find post!"));}

		req.event = event;
		return next();
	});
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/',
	failureFlash : true  
}));

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash : true  
}));

/* Handle Registration POST */
router.post('/signupUser', passport.authenticate('signupUser', {
	successRedirect: '/home',
	failureRedirect: '/signupUser',
	failureFlash : true  
}));

router.get('/merchants', function(req, res, next){
	Merchant.find(function(err, merchant){
		if(err){return next(err);}

		res.json(merchant);
	});
});

router.get('/events', isAuthenticated, function(req, res, next){
	Event.find(function(err, events){
		if(err){return next(err);}

		res.json(events);
	});
});

router.get('/events/:event', function(req,res,next){
	req.event.populate('merchant', function(err, event){
		if(err){return next(err);}
		res.json(event);
	});
});

router.post('/users', function(req, res, next){
	var user = new User(req.body);

	user.save(function(err, user){
		if(err){return next(err);}
		res.json(user);
	});
});

// router.post('/merchants', function(req, res, next){
// 	var merchant = new Merchant(req.body);

// 	merchant.save(function(err, merchant){
// 		if(err){return next(err);}
// 		res.json(merchant);
// 	});
// });

router.get('/merchants/:merchant/events', function(req,res,next){
	req.merchant.populate('events', function(err, merchant){
		if(err){return next(err);}
		res.json(merchant);
	});
});

router.post('/merchants/:merchant/events', isAuthenticated, function(req,res,next){
	var event = new Event(req.body);

	event.merchant = req.merchant;
	event.save(function(err, event){
		if(err){return next(err);}

		res.json(event);
	});
});

router.put('/events/:event/users/:user/checkin',function(req,res,next){});

router.post('/events/:event/users/:user/review', isAuthenticated, function(req,res,next){
	var eventreview = new EventReview(req.body);

	eventreview.user = req.user;
	eventreview.event = req.event;

	eventreview.save(function(err, eventreview){
		if(err){return next(err);}

		res.json(eventreview);
	});
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
