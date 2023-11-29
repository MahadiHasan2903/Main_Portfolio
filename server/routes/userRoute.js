const express = require("express");
const {
  loginController,
  registrationController,
  logoutController,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/registration", registrationController);
userRouter.post("/login", loginController);
userRouter.get(
  "/logout",
  isAuthenticated,
  authorizeRoles("admin"),
  logoutController
);

module.exports = userRouter;
