const mongoose = require("mongoose");

const SpecialOffersSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    more: { type: String, required: true },
    previewImage: { type: String },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SpecialOffers", SpecialOffersSchema);
