const express = require("express");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  createInformation,
  updateInformation,
  deleteInformation,
  getInformation,
} = require("../controllers/informationController");
const informationRoute = express.Router();

informationRoute.post(
  "/create-info",

  isAuthenticated,
  authorizeRoles("admin"),
  createInformation
);
informationRoute.delete(
  "/delete-info",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteInformation
);
informationRoute.put(
  "/update-info",

  isAuthenticated,
  authorizeRoles("admin"),
  updateInformation
);
informationRoute.get("/get-info", getInformation);

module.exports = informationRoute;
