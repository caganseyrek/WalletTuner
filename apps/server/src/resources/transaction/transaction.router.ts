import express, { Router } from "express";

import Auth from "@/middlewares/auth";

import TransactionController from "@/resources/transaction/transaction.controller";

import Validator from "@/utils/validator";

import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/transaction.schema";

import { Globals } from "@/globals";

class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  private middlewares: Globals.MiddlewareArray = {
    get: [Auth.check],
    create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
    update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
    delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
  };

  constructor() {
    this.router = express.Router();
    this.transactionController = new TransactionController();
  }

  public getRouter(): Router {
    this.router.post("/getAllTransactions", ...this.middlewares.get, (req, res, next) => {
      return this.transactionController.getTransactions(req, res, next);
    });
    this.router.post("/createTransactions", ...this.middlewares.create, (req, res, next) => {
      return this.transactionController.createTransaction(req, res, next);
    });
    this.router.patch("/updateTransactions", ...this.middlewares.update, (req, res, next) => {
      return this.transactionController.updateTransaction(req, res, next);
    });
    this.router.delete("/deleteTransactions", ...this.middlewares.delete, (req, res, next) => {
      return this.transactionController.deleteTransaction(req, res, next);
    });
    return this.router;
  }
}

export default TransactionRouter;
