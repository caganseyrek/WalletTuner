import express, { Router } from "express";

import AuthController from "@/resources/auth/auth.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/auth.schema";

const router: Router = express.Router();

const authController: AuthController = new AuthController();

const middlewares: Globals.MiddlewareArray = {
  create: [Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.post("/register", authController.createAuth);
router.post("/login", authController.updateAuth);
router.post("/logout", authController.deleteAuth);
router.post("/revalidate", authController.deleteAuth);

const authRoutes: Router = router;

export default authRoutes;
