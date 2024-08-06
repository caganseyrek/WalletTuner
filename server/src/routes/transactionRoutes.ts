import express, { Router } from "express";

import auth from "../middleware/auth";

const router: Router = express.Router();

router.get("/all", auth /*, allTransactionsController*/);
router.get("/details/:id", auth /*, transactionDetailsController*/);
router.post("/create", auth /*, createTransactionController*/);
router.put("/update", auth /*, updateTransactionController*/);
router.delete("/delete", auth /*, deleteTransactionController*/);

export const transactionRoutes: Router = router;
