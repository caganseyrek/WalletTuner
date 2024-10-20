import express, { Router } from "express";

import createTransactionController from "@/controllers/transaction/createTransaction";
import deleteTransactionController from "@/controllers/transaction/deleteTransaction";
import getTransactionsController from "@/controllers/transaction/getTransactions";
import updateTransactionController from "@/controllers/transaction/updateTransaction";

import auth from "@/middleware/auth";
import validateAccount from "@/middleware/validation/validateAccount";
import validateTransaction from "@/middleware/validation/validateTransaction";
import validateUser from "@/middleware/validation/validateUser";

const router: Router = express.Router();

const getAllValidation = [validateUser];
const createValidation = [validateUser, validateAccount];
const updateValidation = [validateUser, validateAccount, validateTransaction];
const deleteValidation = [validateUser, validateTransaction];

router.post("/details/all", auth, getAllValidation, getTransactionsController);
router.post("/create", auth, createValidation, createTransactionController);
router.patch("/update", auth, updateValidation, updateTransactionController);
router.delete("/delete", auth, deleteValidation, deleteTransactionController);

export const transactionRoutes: Router = router;
