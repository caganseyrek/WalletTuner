import express, { Router } from "express";

import Auth from "@/middlewares/auth";
import Validator from "@/middlewares/validator";

import MilestoneController from "@/resources/milestone/milestone.controller";

import {
  createSchema,
  CreateSchemaParams,
  deleteSchema,
  DeleteSchemaParams,
  updateSchema,
  UpdateSchemaParams,
} from "@/schemas/milestone.schema";

import { Globals } from "@/globals";

class MilestoneRouter {
  private router: Router;
  private milestoneController: MilestoneController;

  private middlewares: Globals.MiddlewareArray = {
    get: [Auth.check],
    create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
    update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
    delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
  };

  constructor() {
    this.router = express.Router();
    this.milestoneController = new MilestoneController();
  }

  public getRouter(): Router {
    this.router.post("/getAllMilestones", ...this.middlewares.get, (req, res, next) => {
      return this.milestoneController.getMilestones(req, res, next);
    });
    this.router.post("/createMilestones", ...this.middlewares.create, (req, res, next) => {
      return this.milestoneController.createMilestone(req, res, next);
    });
    this.router.patch("/updateMilestones", ...this.middlewares.update, (req, res, next) => {
      this.milestoneController.updateMilestone(req, res, next);
    });
    this.router.delete("/deleteMilestones", ...this.middlewares.delete, (req, res, next) => {
      this.milestoneController.deleteMilestone(req, res, next);
    });
    return this.router;
  }
}

export default MilestoneRouter;
