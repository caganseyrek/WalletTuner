import express, { Router } from "express";

import accountController from "@/controllers/accountController";

import * as schemas from "@/middleware/validation/accountSchema";
import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { MiddlewareArray } from "@/types/global";

const router: Router = express.Router();

const middlewares: MiddlewareArray = {
  getAccounts: [auth, validate(schemas.getAccountSchema)],
  createAccount: [auth, validate(schemas.createAccountSchema)],
  updateAccount: [auth, validate(schemas.updateAccountSchema)],
  deleteAccount: [auth, validate(schemas.deleteAccountSchema)],
};

router.post("/all", middlewares.getAccounts, accountController.getAccounts);
router.post("/create", middlewares.createAccount, accountController.createAccount);
router.patch("/update", middlewares.updateAccount, accountController.updateAccount);
router.delete("/delete", middlewares.deleteAccount, accountController.deleteAccount);

const accountRoutes: Router = router;
export default accountRoutes;
