import express, { Router } from "express";

import Auth from "@/middlewares/auth";
import Validator from "@/middlewares/validator";

import AccountController from "@/resources/account/account.controller";

import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/account.schema";

import { Globals } from "@/globals";

class AccountRouter {
  private router: Router;
  private accountController: AccountController;

  private middlewares: Globals.MiddlewareArray = {
    get: [Auth.check],
    create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
    update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
    delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
  };

  constructor() {
    this.router = express.Router();
    this.accountController = new AccountController();
  }

  public getRouter(): Router {
    this.router.get("/getAccounts", ...this.middlewares.get, (req, res, next) => {
      return this.accountController.getAccounts(req, res, next);
    });
    this.router.post("/createAccount", ...this.middlewares.create, (req, res, next) => {
      return this.accountController.createAccount(req, res, next);
    });
    this.router.patch("/updateAccount", ...this.middlewares.update, (req, res, next) => {
      return this.accountController.updateAccount(req, res, next);
    });
    this.router.delete("/deleteAccount", ...this.middlewares.delete, (req, res, next) => {
      return this.accountController.deleteAccount(req, res, next);
    });
    return this.router;
  }
}

export default AccountRouter;
