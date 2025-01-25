import express, { Router } from "express";

import TransactionController from "@/controllers/transactionController";

import schemas from "@/utils/schemas";

import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { GlobalTypes } from "@/types/globals";

const router: Router = express.Router();

const transactionController: TransactionController = new TransactionController();

const middlewares: GlobalTypes.MiddlewareArray = {
  getTransactions: [auth],
  createTransaction: [auth, validate(schemas.transaction.createSchema)],
  updateTransaction: [auth, validate(schemas.transaction.updateSchema)],
  deleteTransaction: [auth, validate(schemas.transaction.deleteSchema)],
};

router.post("/getAllTransactions", middlewares.getTransactions, transactionController.getTransactions);
router.post("/createTransactions", middlewares.createTransaction, transactionController.createTransaction);
router.patch("/updateTransactions", middlewares.updateTransaction, transactionController.updateTransaction);
router.delete("/deleteTransactions", middlewares.deleteTransaction, transactionController.deleteTransaction);

const transactionRoutes: Router = router;

export default transactionRoutes;
