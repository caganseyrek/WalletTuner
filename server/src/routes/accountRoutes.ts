import express, { Router } from "express";

import auth from "../middleware/auth";

const router: Router = express.Router();

router.get("/details/all", auth /*, accountDetailsAllController*/);
router.get("/details/:id", auth /*, accountDetailsOneController*/);
router.post("/create", auth /*, createAccountController*/);
router.put("/update", auth /*, updateAccountController*/);
router.delete("/delete", auth /*, deleteAccountController*/);

export const accountRoutes: Router = router;
