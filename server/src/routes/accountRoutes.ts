import express, { Router } from "express";

import createAccountController from "@/controllers/account/createAccount";
import deleteAccountController from "@/controllers/account/deleteAccount";
import getAccountsController from "@/controllers/account/getAccounts";
import getAccountsByFilterController from "@/controllers/account/getAccountsByFilter";
import updateAccountController from "@/controllers/account/updateAccount";

import auth from "@/middleware/auth";
import validateAccount from "@/middleware/validation/validateAccount";
import validateUser from "@/middleware/validation/validateUser";

const router: Router = express.Router();

const getAllValidation = [validateUser];
const getByFilterValidation = [validateUser, validateAccount];
const createValidation = [validateUser];
const updateValidation = [validateUser, validateAccount];
const deleteValidation = [validateUser, validateAccount];

router.post("/details/all", auth, getAllValidation, getAccountsController);
router.post("/details", auth, getByFilterValidation, getAccountsByFilterController);
router.post("/create", auth, createValidation, createAccountController);
router.patch("/update", auth, updateValidation, updateAccountController);
router.delete("/delete", auth, deleteValidation, deleteAccountController);

export const accountRoutes: Router = router;
