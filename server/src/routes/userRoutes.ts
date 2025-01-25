import express, { Router } from "express";

import UserController from "@/controllers/userController";

import schemas from "@/utils/schemas";

import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { GlobalTypes } from "@/types/globals";

const router: Router = express.Router();

const userController: UserController = new UserController();

const middlewares: GlobalTypes.MiddlewareArray = {
  login: [validate(schemas.user.loginSchema)],
  logout: [auth],
  register: [validate(schemas.user.registerSchema)],
  update: [auth, validate(schemas.user.updateSchema)],
  delete: [auth, validate(schemas.user.deleteSchema)],
  settings: [auth],
  newToken: [auth],
  validateAuth: [auth],
};

router.post("/auth/login", middlewares.login, userController.loginUser);
router.post("/auth/logout", middlewares.logout, userController.logoutUser);
router.post("/auth/register", middlewares.register, userController.registerUser);
router.patch("/update", middlewares.update, userController.updateUser);
router.delete("/delete", middlewares.delete, userController.deleteUser);
router.post("/settings", middlewares.settings, userController.getUserSettings);
router.post("/auth/newToken", middlewares.newToken, userController.newAccessToken);
// router.post("/validate", middlewares.validateAuth, userController.validateAuth);

const userRoutes: Router = router;

export default userRoutes;
