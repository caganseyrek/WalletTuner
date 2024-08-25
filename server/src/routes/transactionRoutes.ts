import express, { Router } from "express";

import createTransactionController from "@/controllers/transaction/createTransaction";
import deleteTransactionController from "@/controllers/transaction/deleteTransaction";
import getTransactionsController from "@/controllers/transaction/getTransactions";
import getTransactionsByAccController from "@/controllers/transaction/getTransactionsByAcc";
import getTransactionsByIdController from "@/controllers/transaction/getTransactionsById";
import updateTransactionController from "@/controllers/transaction/updateTransaction";

import auth from "@/middleware/auth";
import validateAccount from "@/middleware/validation/validateAccount";
import validateTransaction from "@/middleware/validation/validateTransaction";
import validateUser from "@/middleware/validation/validateUser";

const router: Router = express.Router();

const getValidation = [validateUser];
const getByAccValidation = [validateUser, validateAccount];
const getByIdValidation = [validateUser, validateTransaction];
const createValidation = [validateUser, validateAccount];
const updateValidation = [validateUser, validateAccount, validateTransaction];
const deleteValidation = [validateUser, validateTransaction];

router.get("/getAll", auth, getValidation, getTransactionsController);
router.get("/getByAccount", auth, getByAccValidation, getTransactionsByAccController);
router.get("/getById/:id", auth, getByIdValidation, getTransactionsByIdController);
router.post("/create", auth, createValidation, createTransactionController);
router.patch("/update/:id", auth, updateValidation, updateTransactionController);
router.delete("/delete/:id", auth, deleteValidation, deleteTransactionController);

export const transactionRoutes: Router = router;
