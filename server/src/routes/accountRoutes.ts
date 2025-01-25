import express, { Router } from "express";

import AccountController from "@/controllers/accountController";

import schemas from "@/utils/schemas";

import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { GlobalTypes } from "@/types/globals";

const router: Router = express.Router();

const accountController: AccountController = new AccountController();

const middlewares: GlobalTypes.MiddlewareArray = {
  getAccounts: [auth],
  createAccount: [auth, validate(schemas.account.createSchema)],
  updateAccount: [auth, validate(schemas.account.updateSchema)],
  deleteAccount: [auth, validate(schemas.account.deleteSchema)],
};

router.get("/getAllAccounts", middlewares.getAccounts, accountController.getAccounts);
router.post("/createAccount", middlewares.createAccount, accountController.createAccount);
router.patch("/updateAccount", middlewares.updateAccount, accountController.updateAccount);
router.delete("/deleteAccount", middlewares.deleteAccount, accountController.deleteAccount);

const accountRoutes: Router = router;

export default accountRoutes;
