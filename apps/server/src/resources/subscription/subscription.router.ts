import express, { Router } from "express";

import Auth from "@/middlewares/auth";

import SubscriptionController from "@/resources/subscription/subscription.controller";

import Validator from "@/utils/validator";

import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/subscription.schema";

import { Globals } from "@/globals";

class SubscriptionRouter {
  private router: Router;
  private subscriptionController: SubscriptionController;

  private middlewares: Globals.MiddlewareArray = {
    get: [Auth.check],
    create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
    update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
    delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
  };

  constructor() {
    this.router = express.Router();
    this.subscriptionController = new SubscriptionController();
  }

  public getRouter(): Router {
    this.router.get("/getSubscriptions", ...this.middlewares.get, (req, res, next) => {
      return this.subscriptionController.getSubscriptions(req, res, next);
    });
    this.router.post("/createSubscription", ...this.middlewares.create, (req, res, next) => {
      return this.subscriptionController.createSubscription(req, res, next);
    });
    this.router.patch("/updateSubscription", ...this.middlewares.update, (req, res, next) => {
      this.subscriptionController.updateSubscription(req, res, next);
    });
    this.router.delete("/deleteSubscription", ...this.middlewares.delete, (req, res, next) => {
      return this.subscriptionController.deleteSubscription(req, res, next);
    });
    return this.router;
  }
}

export default SubscriptionRouter;
