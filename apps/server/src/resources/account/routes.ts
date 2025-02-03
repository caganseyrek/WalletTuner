import express, { Router } from "express";

import { GlobalTypes } from "@/types/globals";

import AccountController from "@/resources/account/controller";

const router: Router = express.Router();

const accountController: AccountController = new AccountController();

const middlewares: GlobalTypes.MiddlewareArray = {
  getAccounts: [auth],
  createAccount: [auth],
  updateAccount: [auth],
  deleteAccount: [auth],
};

router.get("/getAllAccounts", middlewares.getAccounts, accountController.getAccounts);
router.post("/createAccount", middlewares.createAccount, accountController.createAccount);
router.patch("/updateAccount", middlewares.updateAccount, accountController.updateAccount);
router.delete("/deleteAccount", middlewares.deleteAccount, accountController.deleteAccount);

const accountRoutes: Router = router;

export default accountRoutes;
