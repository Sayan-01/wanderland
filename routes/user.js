const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware/middleware.js");
const userController = require("../controllers/user.js");

router.get("/signup", userController.signUpForm);

router.post("/signup", wrapAsync(userController.signUp));

router.get("/login", userController.logInForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.logIn);

router.get("/logout", userController.logOut);

module.exports = router;
