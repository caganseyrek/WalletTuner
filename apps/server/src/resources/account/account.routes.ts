import express, { Router } from "express";

import AccountController from "@/resources/account/account.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/account.schema";

const router: Router = express.Router();

const accountController: AccountController = new AccountController();

const middlewares: Globals.MiddlewareArray = {
  create: [Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.get("/getAccounts", accountController.getAccounts);
router.post("/createAccount", middlewares.create, accountController.createAccount);
router.patch("/updateAccount", middlewares.update, accountController.updateAccount);
router.delete("/deleteAccount", middlewares.delete, accountController.deleteAccount);

const accountRoutes: Router = router;

export default accountRoutes;
