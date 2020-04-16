const mongoose = require("mongoose");
const ObectId = mongoose.Schema;

var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      max: 160,
      min: 3,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
      max: 100,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObectId, ref: "Category", required: true }],
    tags: [{ type: ObectId, ref: "Tag", required: true }],
    postedBy: {
      type: ObectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);
