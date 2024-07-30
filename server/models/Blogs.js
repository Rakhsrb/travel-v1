const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  more: { type: String },
  previewImage: { type: String },
  images: [{ type: String, required: true }],
  comments: [],
});

module.exports = mongoose.model("blogs", BlogsSchema);
