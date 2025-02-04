import express, { Router } from "express";

import SubscriptionController from "@/resources/subscription/subscription.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
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
  create: [Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.get("/getSubscriptions", subscriptionController.getSubscriptions);
router.post("/createSubscription", middlewares.create, subscriptionController.createSubscription);
router.patch("/updateSubscription", middlewares.update, subscriptionController.updateSubscription);
router.delete("/deleteSubscription", middlewares.delete, subscriptionController.deleteSubscription);

const subscriptionRoutes: Router = router;

export default subscriptionRoutes;
