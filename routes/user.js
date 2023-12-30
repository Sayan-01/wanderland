const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("other/signup.ejs");
});

router.post("/signup", async (req, res) => {//ekhane demo user creat holo //ekhanesame username ar r akta user save jate na hoy tar o code lekhai ache bydefault
  try {
    let { username, email, password } = req.body; //User.save() ra bodole User.regir mathod passporte ar use holo password dea save korar jonno user k
    let newUser = new User({ email, username });
    let registorUser = await User.register(newUser, password); //equvalent to newUser.save()
    // console.log(registorUser);     ar output asbe DB te save hoya user ar object with username , email, salt, hash etc key value pair
    req.flash("success", "User was authorized");
    res.redirect("/listing");
  } catch (error) {
    req.flash("error", "Username alredy exist");
    res.redirect("/signup")
  }
});

router.get("/login", (req, res) => {
  res.render("other/login.ejs");
});

router.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true}),async (req, res) => {    // ai md ware ar maddhome pasport check kore j username deoa ho66e seta already DB te save ache kina
  req.flash("success", "Successfully login")
  res.redirect("/listing");
});

module.exports = router;
