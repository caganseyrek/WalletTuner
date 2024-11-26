import express, { Router } from "express";

import transactionController from "@/controllers/transactionController";

import * as schemas from "@/middleware/validation/transactionSchema";
import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { MiddlewareArray } from "@/types/global";

const router: Router = express.Router();

const middlewares: MiddlewareArray = {
  getTransactions: [auth, validate(schemas.getTransactionsSchema)],
  createTransaction: [auth, validate(schemas.createTransactionSchema)],
  updateTransaction: [auth, validate(schemas.updateTransactionSchema)],
  deleteTransaction: [auth, validate(schemas.deleteTransactionSchema)],
};

router.post("/all", middlewares.getTransactions, transactionController.getTransactions);
router.post("/create", middlewares.createTransaction, transactionController.createTransaction);
router.patch("/update", middlewares.updateTransaction, transactionController.updateTransaction);
router.delete("/delete", middlewares.deleteTransaction, transactionController.deleteTransaction);

const transactionRoutes: Router = router;
export default transactionRoutes;
