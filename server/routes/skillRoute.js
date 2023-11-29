const express = require("express");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillById,
  getAllSkills,
} = require("../controllers/skillController");

const skillRoute = express.Router();

skillRoute.post(
  "/create-skill",
  isAuthenticated,
  authorizeRoles("admin"),
  createSkill
);

skillRoute.delete(
  "/delete-skill/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteSkill
);

skillRoute.put(
  "/update-skill/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateSkill
);

skillRoute.get("/get-skill/:id", getSkillById);

skillRoute.get("/get-all-skills", getAllSkills);

module.exports = skillRoute;
