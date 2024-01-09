const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  category: {
      type: [String]
    },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//code for deletion
listingSchema.post("findOneAndDelete", async (list) => {
  if (list) {
    Review.deleteMany({ _id: { $in: list.reviews } });
    console.log(list);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
