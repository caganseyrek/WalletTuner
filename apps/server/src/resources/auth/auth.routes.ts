import express, { Router } from "express";

import AuthController from "@/resources/auth/auth.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
import Auth from "@/middleware/auth";
import {
  deleteUserSchema,
  DeleteUserSchemaSchemaParams,
  getUserDetailsSchema,
  GetUserDetailsSchemaParams,
  loginSchema,
  LoginSchemaParams,
  logoutSchema,
  LogoutSchemaParams,
  newAccessTokenSchema,
  NewAccessTokenSchemaParams,
  registerSchema,
  RegisterSchemaParams,
  updateUserSchema,
  UpdateUserSchemaSchemaParams,
} from "@/schemas/auth.schema";

const router: Router = express.Router();

const authController: AuthController = new AuthController();

const middlewares: Globals.MiddlewareArray = {
  register: [Validator.validateRequestBody<RegisterSchemaParams>(registerSchema)],
  login: [Validator.validateRequestBody<LoginSchemaParams>(loginSchema)],
  logout: [Auth.check, Validator.validateRequestBody<LogoutSchemaParams>(logoutSchema)],
  newAccessToken: [Auth.check, Validator.validateRequestBody<NewAccessTokenSchemaParams>(newAccessTokenSchema)],
  getUserDetails: [Auth.check, Validator.validateRequestBody<GetUserDetailsSchemaParams>(getUserDetailsSchema)],
  updateUser: [Auth.check, Validator.validateRequestBody<UpdateUserSchemaSchemaParams>(updateUserSchema)],
  deleteUser: [Auth.check, Validator.validateRequestBody<DeleteUserSchemaSchemaParams>(deleteUserSchema)],
};

router.post("/register", middlewares.register, authController.register);
router.post("/login", middlewares.login, authController.login);
router.post("/logout", middlewares.logout, authController.logout);
router.post("/newAccessToken", middlewares.newAccessToken, authController.newAccessToken);
router.post("/user/getUserDetails", middlewares.getUserDetails, authController.getUserDetails);
router.post("/user/updateUser", middlewares.updateUser, authController.updateUser);
router.post("/user/deleteUser", middlewares.deleteUser, authController.deleteUser);

const authRoutes: Router = router;

export default authRoutes;
