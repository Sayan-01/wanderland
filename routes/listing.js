const express = require("express");
const router = express.Router(); //router object
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const listingSchema = require("../schema_joi.js");
const { isLogin } = require("../middleware/middleware.js");

//1st routing
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    
    let alllisting = await Listing.find({}); //sokol data k find korlam jeta akta array r seta k alllisting a store korlam
    res.render("listing/home.ejs", { alllisting: alllisting }); //alllisting array k object a value banea pass korlam
  })
);

//new post ar jonno new ejs file show korbe
router.get("/new", isLogin, (req, res) => {
  res.render("listing/new.ejs");
});

//individual id dekhar jonno #show route
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const fulllisting = await Listing.findById(id).populate("reviews"); //ekhane fulllisting akta object jate oi id listing ar sokor tottho ache
    // console.log(fulllisting);      {_id: ..., title: ..., description: ...,.... }
    if (!fulllisting) {
      req.flash("error", "Listing does not exist");
      res.redirect("/listing");
    }
    res.render("listing/show.ejs", { fulllisting });
  })
);

//new listing save ar post request #creat route
router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    // let result = listingSchema.validate(req.body);
    // if (result.error) {
    //   throw new ExpressError(400, result.error);
    // }

    const newListing = new Listing(req.body.listing); //ekhon kotha holo listing obj elo ki kore karon req.body to amon hoyar kotha => {title: ..., description: ..., ....}. But amra akta object toi ri korbo jar key hobe title, desctiption... and oi object ar namr hobe listing sutorang req.body print korle asbe {listing: {title: ..., ....}}
    // console.log(newListing);     gives a new object {title: ..., description: ..., ....}
    await newListing.save(); //newlisting printkorle akta object asbe r seta 70 no. line (console.log(req.body.listing)) a ache
    req.flash("success", "New listing was created!"); //ai line ar maddhome success ar jonno flash creat koraholo
    res.redirect("/listing");
  })
);

//edit from show korar jonno
router.get(
  "/:id/edit",
  isLogin,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist");
      res.redirect("/listing");
    }
    res.render("listing/edit.ejs", { listing });
  })
);

//update korar jonno
router.put(
  "/:id",
  wrapAsync(async (req, res, next) => {
    //ar jonno amader id r listing value k extract korte hobo
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //ekhane "..." dea destacturing korlam karon ekhetre 2nd argument hisabe object a key value pain pass korte hoto
    // console.log(req.body.listing);     ar ans hobe akta {title: ..., description: ..., ....}
    // console.log(req.body);       ar ans hobe akta {listing: {title: ..., description: ..., ....}}
    req.flash("success", "Listing updated!");
    res.redirect(`/listing/`);
  })
);

//delete korar jonno
router.delete(
  "/:id",
  isLogin,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing was deleted!");
    res.redirect("/listing");
  })
);

module.exports = router;
