const Blog = require("../models/blog");

// CREATE blog
const createBlog = async (req, res) => {
  try {
    const { title, content, authorName, tags, blogImage } = req.body;

    // Check required fields
    if (!title || !content || !authorName) {
      return res.status(400).json({
        success: false,
        message: "Title, content and authorName are required",
      });
    }

    // Create blog
    const blog = await Blog.create({
      title,
      content,
      authorName,
      tags: tags || [],
      blogImage: blogImage || "",
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};
// GET all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

// GET single blog
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

// UPDATE blog
const updateBlog = async (req, res) => {
  try {
    const { title, content, authorName, tags, blogImage } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check blog owner
    if (blog.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own blog",
      });
    }

    // Update fields
    if (title) {
      blog.title = title;
    }

    if (content) {
      blog.content = content;
    }

    if (authorName) {
      blog.authorName = authorName;
    }

    if (tags) {
      blog.tags = tags;
    }

    if (blogImage) {
      blog.blogImage = blogImage;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check blog owner
    if (blog.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own blog",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: error.message,
    });
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};