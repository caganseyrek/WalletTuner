import express, { Router } from "express";

import tokenController from "@/controllers/tokenController";

import * as schemas from "@/middleware/validation/tokenSchemas";
import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { MiddlewareArray } from "@/types/global";

const router: Router = express.Router();

const middlewares: MiddlewareArray = {
  newToken: [auth, validate(schemas.newTokenSchema)],
};

router.post("/newtoken", middlewares.newToken, tokenController.newAccessToken);

const tokenRoutes: Router = router;
export default tokenRoutes;
