var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
	//return next();
	if (req.isAuthenticated()) {
		return next();
	}
		
	// if the user is not authenticated then redirect him to the login page
	console.log('Authenticated Failed')
	res.redirect('https://eismwip.herokuapp.com/login-page');
}

module.exports = {isAuthenticated: isAuthenticated}
