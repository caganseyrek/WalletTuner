import express, { Router } from "express";

import SubscriptionController from "@/resources/subscription/subscription.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
import Auth from "@/middleware/auth";
import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/subscription.schema";

const router: Router = express.Router();

const subscriptionController: SubscriptionController = new SubscriptionController();

const middlewares: Globals.MiddlewareArray = {
  get: [Auth.check],
  create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.get("/getSubscriptions", middlewares.get, subscriptionController.getSubscriptions);
router.post("/createSubscription", middlewares.create, subscriptionController.createSubscription);
router.patch("/updateSubscription", middlewares.update, subscriptionController.updateSubscription);
router.delete("/deleteSubscription", middlewares.delete, subscriptionController.deleteSubscription);

const subscriptionRoutes: Router = router;

export default subscriptionRoutes;
