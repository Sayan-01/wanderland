const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema_joi.js");

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

//1st routing

app.get(
  "/listing",
  wrapAsync(async (req, res, next) => {
    let alllisting = await Listing.find({}); //sokol data k find korlam jeta akta array r seta k alllisting a store korlam
    res.render("listing/home.ejs", { alllisting: alllisting }); //alllisting array k object a value banea pass korlam
  })
);

//new post ar jonno new ejs file show korbe

app.get("/listing/new", (req, res) => {
  res.render("listing/new.ejs");
});

//individual id dekhar jonno

app.get(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const fulllisting = await Listing.findById(id); //ekhane fulllisting akta object
    // console.log(fulllisting);      {_id: ..., title: ..., description: ...,.... }
    res.render("listing/show.ejs", { fulllisting });
  })
);

//new listing save ar post request #creat route

app.post(
  "/listing",
  wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    if (result.error) {
      throw new ExpressError(400, result.error);
    }

    const newListing = new Listing(req.body.listing); //ekhon kotha holo listing obj elo ki kore karon req.body to amon hoyar kotha => {title: ..., description: ..., ....}. But amra akta object toi ri korbo jar key hobe title, desctiption... and oi object ar namr hobe listing sutorang req.body print korle asbe {listing: {title: ..., ....}}
    // console.log(newListing);     gives a new object {title: ..., description: ..., ....}
    await newListing.save(); //newlisting printkorle akta object asbe r seta 70 no. line (console.log(req.body.listing)) a ache
    res.redirect("/listing");
  })
);

//edit from show korar jonno

app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing });
  })
);

//update korar jonno

app.put(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    //ar jonno amader id r listing value k extract korte hobo
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //ekhane "..." dea destacturing korlam karon ekhetre 2nd argument hisabe object a key value pain pass korte hoto
    // console.log(req.body.listing);     ar ans hobe akta {title: ..., description: ..., ....}
    // console.log(req.body);       ar ans hobe akta {listing: {title: ..., description: ..., ....}}
    res.redirect(`/listing/`);
  })
);

//delete korar jonno

app.delete(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "ERROR, PAGE NOT FOUND")); //ata mandetory, protita server ai code ta likhtei hoy for err handling
});

// app.get("/admin", (req, res) => {
//   throw new ExpressError(403, "ERROR");
// });

app.use((err, req, res, next) => {
  let { status = 500, message = "something wrong" } = err; //ata mandetory, protita server ai code ta likhtei hoy for err handling
  res.render("error/error.ejs", { message });
});
