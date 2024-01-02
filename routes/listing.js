const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLogin, isOwner } = require("../middleware/middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); //for frontend theke asa file kl kothaysave korbo ata ai line ar maddhome thik kora hoy

//home route
router.get("/", wrapAsync(listingController.index));

//new post ar jonno new ejs file show korbe
router.get("/new", isLogin, listingController.newPostForm);

//individual id dekhar jonno #show route
router.get("/:id", wrapAsync(listingController.showSingleListing));

//new listing save ar post request #creat route
router.post("/", upload.single("listing[image]"), wrapAsync(listingController.newListingSave));

//edit from show korar jonno
router.get("/:id/edit", isLogin, isOwner, wrapAsync(listingController.editForm));

//update korar jonno
router.put("/:id", isLogin, isOwner, upload.single("listing[image]"), wrapAsync(listingController.listingUpdate));

//delete korar jonno
router.delete("/:id", isLogin, isOwner, wrapAsync(listingController.distroyListinf));

module.exports = router;
