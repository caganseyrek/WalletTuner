import express, { Router } from "express";

import MilestoneController from "@/resources/milestone/milestone.controller";

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
} from "@/schemas/milestone.schema";

const router: Router = express.Router();

const milestoneController: MilestoneController = new MilestoneController();

const middlewares: Globals.MiddlewareArray = {
  get: [Auth.check],
  create: [Auth.check, Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Auth.check, Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Auth.check, Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.post("/getAllMilestones", middlewares.get, milestoneController.getMilestones);
router.post("/createMilestones", middlewares.create, milestoneController.createMilestone);
router.patch("/updateMilestones", middlewares.update, milestoneController.updateMilestone);
router.delete("/deleteMilestones", middlewares.delete, milestoneController.deleteMilestone);

const milestoneRoutes: Router = router;

export default milestoneRoutes;
