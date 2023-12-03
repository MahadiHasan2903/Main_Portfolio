const express = require("express");
const {
  loginController,
  registrationController,
  getAllUsersController,
  getSingleUserController,
  deleteUserController,
  updateUserController,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/registration", registrationController);
userRouter.post("/login", loginController);
userRouter.get("/get-user/:id", getSingleUserController);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUserController
);
userRouter.put(
  "/update-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserController
);
userRouter.get("/get-all-users", getAllUsersController);

module.exports = userRouter;
