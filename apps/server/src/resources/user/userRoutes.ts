import express, { Router } from "express";

import auth from "@/middleware/auth";

import { GlobalTypes } from "@/types/globals";

import UserController from "@/resources/user/userController";

const router: Router = express.Router();

const userController: UserController = new UserController();

const middlewares: GlobalTypes.MiddlewareArray = {
  logout: [auth],
  update: [auth],
  delete: [auth],
  settings: [auth],
  newToken: [auth],
  validateAuth: [auth],
};

router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);
router.post("/auth/logout", middlewares.logout, userController.logoutUser);
router.patch("/update", middlewares.update, userController.updateUser);
router.delete("/delete", middlewares.delete, userController.deleteUser);
router.post("/settings", middlewares.settings, userController.getUserSettings);
router.post("/auth/newToken", middlewares.newToken, userController.newAccessToken);
// router.post("/validate", middlewares.validateAuth, userController.validateAuth);

const userRoutes: Router = router;

export default userRoutes;
