const express = require("express");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  createExperience,
  deleteExperience,
  updateExperience,
  getAllExperiences,
  getSingleExperience,
} = require("../controllers/experienceController");

const experienceRoute = express.Router();

experienceRoute.post(
  "/create-experience",
  isAuthenticated,
  authorizeRoles("admin"),
  createExperience
);

experienceRoute.delete(
  "/delete-experience/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteExperience
);

experienceRoute.put(
  "/update-experience/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateExperience
);

experienceRoute.get("/get-experience/:id", getSingleExperience);

experienceRoute.get("/get-all-experiences", getAllExperiences);

module.exports = experienceRoute;
