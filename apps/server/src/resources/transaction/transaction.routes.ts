import express, { Router } from "express";

import TransactionController from "@/resources/transaction/transaction.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
import Auth from "@/middleware/auth";
import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/transaction.schema";

const router: Router = express.Router();

const transactionController: TransactionController = new TransactionController();

const middlewares: Globals.MiddlewareArray = {
  get: [Auth.check],
  create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.post("/getAllTransactions", middlewares.get, transactionController.getTransactions);
router.post("/createTransactions", middlewares.create, transactionController.createTransaction);
router.patch("/updateTransactions", middlewares.update, transactionController.updateTransaction);
router.delete("/deleteTransactions", middlewares.delete, transactionController.deleteTransaction);

const transactionRoutes: Router = router;

export default transactionRoutes;
