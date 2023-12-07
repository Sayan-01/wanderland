const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
engine = require("ejs-mate");

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

//1st routing

app.get("/listing", async (req, res) => {
  let alllisting = await Listing.find({}); //sokol data k find korlam jeta akta array r seta k alllisting a store korlam
  res.render("listing/home.ejs", { alllisting: alllisting }); //alllisting array k object a value banea pass korlam
});

//new post ar jonno new ejs file show korbe

app.get("/listing/new", (req, res) => {
  res.render("listing/new.ejs");
});

//individual id dekhar jonno

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const fulllisting = await Listing.findById(id); //ekhane fulllisting akta object
  // console.log(fulllisting);      {_id: ..., title: ..., description: ...,.... }
  res.render("listing/show.ejs", { fulllisting });
});

//new listing save ar post request

app.post("/listing", async (req, res) => {
  const newListing = new Listing(req.body.listing); //ekhon kotha holo listing obj elo ki kore karon req.body to amon hoyar kotha => {title: ..., description: ..., ....}. But amra akta object toi ri korbo jar key hobe title, desctiption... and oi object ar namr hobe listing sutorang req.body print korle asbe {listing: {title: ..., ....}}
  // console.log(newListing);     gives a new object {title: ..., description: ..., ....}
  await newListing.save(); //newlisting printkorle akta object asbe r seta 70 no. line (console.log(req.body.listing)) a ache
  res.redirect("/listing");
});

//edit from show korar jonno

app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listing/edit.ejs", { listing });
});

//update korar jonno

app.put("/listing/:id", async (req, res) => {
  //ar jonno amader id r listing value k extract korte hobo
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //ekhane "..." dea destacturing korlam karon ekhetre 2nd argument hisabe object a key value pain pass korte hoto
  // console.log(req.body.listing);     ar ans hobe akta {title: ..., description: ..., ....}
  // console.log(req.body);       ar ans hobe akta {listing: {title: ..., description: ..., ....}}
  res.redirect(`/listing/`);
});

//delete korar jonno

app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});

