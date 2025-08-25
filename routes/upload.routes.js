const express = require('express');
const { createBlog, getBlogs, getBlogById } = require('../controllers/blogController');
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");


router.post("/blog", auth, upload.single("image"), createBlog);
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlogById);


module.exports = router;
