const Listing = require("../models/listing.js");
const listingSchema = require("../schema_joi.js");

module.exports.index = async (req, res, next) => {
  let alllisting = await Listing.find({}); //sokol data k find korlam jeta akta array r seta k alllisting a store korlam
  res.render("listing/home.ejs", { alllisting: alllisting }); //alllisting array k object a value banea pass korlam
};

module.exports.newPostForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.showSingleListing = async (req, res, next) => {
  let { id } = req.params;
  const fulllisting = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!fulllisting) {
    req.flash("error", "Listing does not exist");
    res.redirect("/listing");
  }
  res.render("listing/show.ejs", { fulllisting });
};

module.exports.newListingSave = async (req, res, next) => {
  // let result = listingSchema.validate(req.body);
  // if (result.error) {
  //   throw new ExpressError(400, result.error);
  // }

  let url = req.file.path; //req.body te jemon urlencoded data ase temon req.file a file parse hoy malter ar jonno
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing); //ekhon kotha holo listing obj elo ki kore karon req.body to amon hoyar kotha => {title: ..., description: ..., ....}. But amra akta object toi ri korbo jar key hobe title, desctiption... and oi object ar namr hobe listing sutorang req.body print korle asbe {listing: {title: ..., ....}}
  //console.log(newListing);     gives a new object {title: ..., description: ..., ....}
  newListing.owner = req.user._id; //owner key te value add korar jonno
  newListing.image = { url, filename };
  newListing.category = Object.values(req.body.category);
  await newListing.save(); //newlisting printkorle akta object asbe r seta 70 no. line (console.log(req.body.listing)) a ache
  req.flash("success", "New listing was created!"); //ai line ar maddhome success ar jonno flash creat koraholo
  res.redirect("/listing");
};

module.exports.editForm = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist");
    res.redirect("/listing");
  }
  res.render("listing/edit.ejs", { listing });
};

module.exports.listingUpdate = async (req, res, next) => {
  let { id } = req.params;
  const newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //ekhane "..." dea destacturing korlam karon ekhetre 2nd argument hisabe object a key value pain pass korte hoto
  // console.log(req.body.listing);     ar ans hobe akta {title: ..., description: ..., ....}
  // console.log(req.body);       ar ans hobe akta {listing: {title: ..., description: ..., ....}}
  if (req.body.category) {
    newListing.category = Object.values(req.body.category);
    newListing.save();
  }
  if (req.file) {
    let url = req.file.path; //req.body te jemon urlencoded data ase temon req.file a file parse hoy malter ar jonno
    let filename = req.file.filename;
    newListing.image = { url, filename };
    newListing.save();
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listing/${id}`);
};

module.exports.distroyListinf = async (req, res, next) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing was deleted!");
  res.redirect("/listing");
};
