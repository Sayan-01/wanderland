const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema_joi.js");
const passport = require("passport");
const localStategy = require("passport-local");
const User = require("./models/user.js")

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", engine);

app.listen(3000, () => {
  console.log("listening");
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res) => {
  res.render("listing/landing-page.ejs");
});

app.use("/listing", listings)
app.use("/listing/:id/reviews", reviews)
app.use("/", user)

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "ERROR, PAGE NOT FOUND")); //ata mandetory, protita server ai code ta likhtei hoy for err handling
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something wrong" } = err; //ata mandetory, protita server ai code ta likhtei hoy for err handling
  res.render("error/error.ejs", { message });
});
