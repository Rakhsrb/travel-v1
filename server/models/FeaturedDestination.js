const mongoose = require("mongoose");

const FeaturedDestinationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  image: { type: String, required: true },
  listing: { type: Number },
});

module.exports = mongoose.model("featuredDestination", FeaturedDestinationSchema);
