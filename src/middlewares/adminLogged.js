function adminLogged(req, res, next) {
	let logged = req.session.userLogged;
	if(!logged){
		return res.redirect ("/")
	}
	next();
}

module.exports = adminLogged;