import express from "express";
import {

  login,
  logout
} from "../controllers/user-controller.js";
import { isAuthenticated } from "../../middlewares/auth.js";
// import { rbacMiddleware } from "../../middlewares/rbac-middleware.js";
export const userRouter = express.Router();
// userRouter.get("/role",getRoleData);
userRouter.post("/login", login);
userRouter.post("/logout", isAuthenticated, logout);
// userRouter.get("/token-verify", tokenVerify);
// userRouter.get("/profile", isAuthenticated, profile);
// userRouter.post("/remove", isAuthenticated, rbacMiddleware, remove);
// userRouter.put("/change-password", isAuthenticated, changePassword);
// userRouter.get("/all-users", isAuthenticated, getAllUsers);
// userRouter.delete("/delete-user/:userId", isAuthenticated, deleteUser);
