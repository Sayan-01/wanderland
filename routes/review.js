const express = require("express");
const router = express.Router({mergeParams: true}); //router object
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//for adding review

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;      //akhin ekhane kono :id asbe na karon ,listing/:id/reviews app.js likhle , 
                                        //asa :id oi app.js file ai roy jay tai oi :id pass koranor jonnoilikhte 
                                        //hoyche "marge params" ta likhle perent rout a asa parameter k child ar 
                                        //sathe marge kore day
    let listing = await Listing.findById(id);
    let { rating, comment } = await req.body;
    let newReview = new Review({ rating, comment });

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${id}`);
  })
);

//review delet

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //pull means deleting from array
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
  })
);

module.exports = router;