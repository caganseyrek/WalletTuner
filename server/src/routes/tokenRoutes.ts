import express, { Router } from "express";

import newTokenController from "@/controllers/token/newToken";

import * as schemas from "@/middleware/validation/tokenSchemas";
import auth from "@/middleware/auth";
import validate from "@/middleware/validate";

import { MiddlewareArray } from "@/types/global";

const router: Router = express.Router();

const middlewares: MiddlewareArray = {
  newToken: [auth, validate(schemas.newTokenSchema)],
};

router.post("/newtoken", middlewares.newToken, newTokenController);

const tokenRoutes: Router = router;
export default tokenRoutes;
