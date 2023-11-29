const express = require("express");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getProjectById,
} = require("../controllers/projectController");

const projectRoute = express.Router();

projectRoute.post(
  "/create-project",
  isAuthenticated,
  authorizeRoles("admin"),
  createProject
);

projectRoute.delete(
  "/delete-project/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProject
);

projectRoute.put(
  "/update-project/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateProject
);

projectRoute.get("/get-project/:id", getProjectById);

projectRoute.get("/get-all-projects", getAllProjects);

module.exports = projectRoute;
