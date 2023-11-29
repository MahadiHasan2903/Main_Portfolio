const express = require("express");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  createEducation,
  updateEducation,
  deleteEducation,
  getEducationById,
  getAllEducations,
} = require("../controllers/educationController");

const educationRoute = express.Router();

educationRoute.post(
  "/create-education",
  isAuthenticated,
  authorizeRoles("admin"),
  createEducation
);

educationRoute.delete(
  "/delete-education/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteEducation
);

educationRoute.put(
  "/update-education/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateEducation
);

educationRoute.get("/get-education/:id", getEducationById);

educationRoute.get("/get-all-educations", getAllEducations);

module.exports = educationRoute;
