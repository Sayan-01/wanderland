const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

module.exports.signUpForm = (req, res) => {
  res.render("authentication/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  //ekhane demo user creat holo //ekhanesame username ar r akta user save jate na hoy tar o code lekhai ache bydefault
  try {
    let { username, email, password } = req.body; //User.save() ra bodole User.regir mathod passporte ar use holo password dea save korar jonno user k
    let newUser = new User({ email, username });
    let registorUser = await User.register(newUser, password); //equvalent to newUser.save()
    // console.log(registorUser);     ar output asbe DB te save hoya user ar object with username , email, salt, hash etc key value pair
    req.login(registorUser, () => {
      req.flash("success", "Now you Login!");
      res.redirect("/listing");
    });
  } catch (error) {
    req.flash("error", "Username alredy exist");
    res.redirect("/signup");
  }
};

module.exports.logInForm = (req, res) => {
  res.render("authentication/login.ejs");
};

module.exports.logIn = async (req, res) => {
  // ai md ware ar maddhome pasport check kore j username deoa ho66e seta already DB te save ache kina
  req.flash("success", "Successfully login");
  let reDirectVer = res.locals.saveurl || "/listing";
  res.redirect(reDirectVer);
};

module.exports.logOut = (req, res) => {
  req.logout(() => {
    req.flash("success", "Now you Log out!");
    res.redirect("/listing");
  });
};
