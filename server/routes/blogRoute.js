const express = require("express");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const blogRoute = express.Router();

blogRoute.post(
  "/create-blog",
  isAuthenticated,
  authorizeRoles("admin"),
  createBlog
);

blogRoute.delete(
  "/delete-blog/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteBlog
);

blogRoute.put(
  "/update-blog/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateBlog
);

blogRoute.get("/get-blog/:id", getSingleBlog);

blogRoute.get("/get-all-blogs", getAllBlogs);

module.exports = blogRoute;
