module.exports.isLogin = (req, res, next) => {
  if(!req.isAuthenticated()) {      // passport ar by default method ja login/sign up ar thakle true return kore r noyto false return kore
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "At first loggedin");
    res.redirect("/login")
  } next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl) {
    res.locals.saveurl = req.session.redirectUrl;
  } next()
}