import express, { Router } from "express";

import newTokenController from "../controllers/token/newtokenController";

import auth from "../middleware/auth";

const router: Router = express.Router();

router.post("/newtoken", auth, newTokenController);

export const tokenRoutes: Router = router;
