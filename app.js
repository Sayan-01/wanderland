require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
// const listingSchema = require("./schema_joi.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", engine);

const dbUrl = process.env.ATLASDB_URL;
const dbUrl2 = "mongodb://localhost:27017/wanderlust";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl2);
}

const store = MongoStore.create({
  //method to creat ney mongo store
  mongoUrl: dbUrl2,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 36000 * 24,
});

store.on("error", () => {
  console.log("ErroR is :->", err);
});

const sess = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpsOnly: true,
  },
};

app.use(session(sess));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //ai  5 ta line amake authentication ar 3 te package use ar jonno likhtei hobe

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); //success in an array
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; //req.user k direct ejs template a use korte parbo na tai locals assave korlam, r access ar jonno kebol currentUser likte hobey
  next();
});

app.get("/", (req, res) => {
  res.render("listing/landing-page.ejs");
});

app.use("/listing", listings);
app.use("/listing/:id/reviews", reviews);
app.use("/", user);

app.get("/listing/filter/:category", async (req, res) => {
  let { category } = req.params;
  let alllisting = await Listing.find({ category: category });
  res.render("listing/home.ejs", { alllisting: alllisting });
});

app.post("/listing/search/", async (req, res) => {
  let { title } = req.body.listingss;
  console.log(req.body.listingss);
  let alllisting = await Listing.find({ $or: [{ title: { $regex: title, $options: "i" } }] });
  res.render("listing/home.ejs", { alllisting: alllisting });
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "ERROR, PAGE NOT FOUND")); //ata mandetory, protita server ai code ta likhtei hoy for err handling
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something wrong" } = err; //ata mandetory, protita server ai code ta likhtei hoy for err handling
  res.render("error/error.ejs", { message });
});

app.listen(3000, () => {
  console.log("listening");
});
