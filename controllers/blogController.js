const { fileUploadOnCloudinary } = require("../config/cloudinary");
const Blog = require("../models/blogModel");


const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Please provide  title and content." });
    }

    if (!req.file) {
      return res.status(400).json({ message: " image is missing." });
    }

    const uploadResult = await fileUploadOnCloudinary(req.file.buffer, "blogs");

    const newBlog = await Blog.create({
      title,
      content,
      imageURL: uploadResult.secure_url,
      authorId: req.user.userID
    });

    const blogWithAuthor = await newBlog.populate("authorId", "name email");

    res.status(201).json({
      message: "Blog posted successfully!",
      blog: blogWithAuthor
    });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Something went wrong on the server.", error: err });
  }
};

const getBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find()
      .populate("authorId", "name email")
      .sort({ createdAt: -1 }); 

    res.json({
      count: allBlogs.length,
      blogs: allBlogs
    });
  } catch (err) {
    console.error("Error in fetch :", err);
    res.status(500).json({ message: "Failed to fetch  usefr blogs.", error: err });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("authorId", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error while fetching blog.", error: err });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById
};