import express, { Router } from "express";

import newTokenController from "@/controllers/token/newToken";

import auth from "@/middleware/auth";
import validateUser from "@/middleware/validation/validateUser";

const router: Router = express.Router();

router.post("/newtoken", auth, validateUser, newTokenController);

export const tokenRoutes: Router = router;
