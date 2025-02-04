import express, { Router } from "express";

import MilestoneController from "@/resources/milestone/milestone.controller";

import Validator from "@/utils/validator";

import { Globals } from "@/globals";
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
  create: [Validator.validateRequestBody<CreateSchemaParams>(createSchema)],
  update: [Validator.validateRequestBody<UpdateSchemaParams>(updateSchema)],
  delete: [Validator.validateRequestBody<DeleteSchemaParams>(deleteSchema)],
};

router.post("/getAllMilestones", milestoneController.getMilestones);
router.post("/createMilestones", middlewares.create, milestoneController.createMilestone);
router.patch("/updateMilestones", middlewares.update, milestoneController.updateMilestone);
router.delete("/deleteMilestones", middlewares.delete, milestoneController.deleteMilestone);

const milestoneRoutes: Router = router;

export default milestoneRoutes;
