const express = require("express");
const router = express.Router({ mergeParams: true }); //router object
const wrapAsync = require("../utils/wrapAsync.js");
const { isLogin, isReviewAuthor } = require("../middleware/middleware.js");
const reviewCollector = require("../controllers/review.js");

//for adding review
router.post("/", isLogin, wrapAsync(reviewCollector.addReview));

//review delete
router.delete("/:reviewId", isLogin, isReviewAuthor, wrapAsync(reviewCollector.deletReview));

module.exports = router;
