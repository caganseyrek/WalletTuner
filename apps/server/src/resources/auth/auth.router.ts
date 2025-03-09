import express, { Router } from "express";

import Auth from "@/middlewares/auth";
import Validator from "@/middlewares/validator";

import AuthController from "@/resources/auth/auth.controller";

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

import { Globals } from "@/globals";

class AuthRouter {
  private router: Router;
  private authController: AuthController;

  private middlewares: Globals.MiddlewareArray = {
    register: [Validator.validateRequestBody<RegisterSchemaParams>(registerSchema)],
    login: [Validator.validateRequestBody<LoginSchemaParams>(loginSchema)],
    logout: [Auth.check, Validator.validateRequestBody<LogoutSchemaParams>(logoutSchema)],
    newAccessToken: [Auth.check, Validator.validateRequestBody<NewAccessTokenSchemaParams>(newAccessTokenSchema)],
    getUserDetails: [Auth.check, Validator.validateRequestBody<GetUserDetailsSchemaParams>(getUserDetailsSchema)],
    updateUser: [Auth.check, Validator.validateRequestBody<UpdateUserSchemaSchemaParams>(updateUserSchema)],
    deleteUser: [Auth.check, Validator.validateRequestBody<DeleteUserSchemaSchemaParams>(deleteUserSchema)],
  };

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
  }

  public getRouter(): Router {
    this.router.post("/register", ...this.middlewares.register, (req, res, next) => {
      return this.authController.register(req, res, next);
    });
    this.router.post("/login", (req, res, next) => {
      return this.authController.login(req, res, next);
    });
    this.router.post("/logout", ...this.middlewares.logout, (req, res, next) => {
      return this.authController.logout(req, res, next);
    });
    this.router.post("/newAccessToken", ...this.middlewares.newAccessToken, (req, res, next) => {
      return this.authController.newAccessToken(req, res, next);
    });
    this.router.post("/user/getUserDetails", ...this.middlewares.getUserDetails, (req, res, next) => {
      return this.authController.getUserDetails(req, res, next);
    });
    this.router.post("/user/updateUser", ...this.middlewares.updateUser, (req, res, next) => {
      return this.authController.updateUser(req, res, next);
    });
    this.router.post("/user/deleteUser", ...this.middlewares.deleteUser, (req, res, next) => {
      return this.authController.deleteUser(req, res, next);
    });
    return this.router;
  }
}

export default AuthRouter;
