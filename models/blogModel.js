const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
   content: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  authid:{
    ref:"UserData",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;