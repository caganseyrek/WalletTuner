import express, { Router } from "express";

import userController from "@/controllers/userController";

import * as schemas from "../middleware/validation/userSchemas";
import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { MiddlewareArray } from "@/types/global";

const router: Router = express.Router();

const middlewares: MiddlewareArray = {
  login: [validate(schemas.loginUserSchema)],
  logout: [auth, validate(schemas.identifierSchema)],
  register: [validate(schemas.registerUserSchema)],
  update: [auth, validate(schemas.updateUserSchema)],
  delete: [auth, validate(schemas.deleteUserSchema)],
  settings: [auth, validate(schemas.identifierSchema)],
};

router.post("/login", middlewares.login, userController.loginUser);
router.post("/logout", middlewares.logout, userController.logoutUser);
router.post("/register", middlewares.register, userController.registerUser);
router.patch("/update", middlewares.update, userController.updateUser);
router.delete("/delete", middlewares.delete, userController.deleteUser);
router.post("/settings", middlewares.settings, userController.getUserSettings);

const userRoutes: Router = router;
export default userRoutes;
