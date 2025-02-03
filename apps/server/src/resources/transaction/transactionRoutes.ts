import express, { Router } from "express";

import auth from "@/middleware/auth";

import { GlobalTypes } from "@/types/globals";

import TransactionController from "@/resources/transaction/transactionController";

const router: Router = express.Router();

const transactionController: TransactionController = new TransactionController();

const middlewares: GlobalTypes.MiddlewareArray = {
  getTransactions: [auth],
  createTransaction: [auth],
  updateTransaction: [auth],
  deleteTransaction: [auth],
};

router.post("/getAllTransactions", middlewares.getTransactions, transactionController.getTransactions);
router.post("/createTransactions", middlewares.createTransaction, transactionController.createTransaction);
router.patch("/updateTransactions", middlewares.updateTransaction, transactionController.updateTransaction);
router.delete("/deleteTransactions", middlewares.deleteTransaction, transactionController.deleteTransaction);

const transactionRoutes: Router = router;

export default transactionRoutes;
