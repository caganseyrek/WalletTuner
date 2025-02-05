import { NextFunction, Request, Response } from "express";

import STATUS_CODES from "@/constants/statusCodes";

import MilestoneService from "./milestone.service";
import { Milestone } from "./milestone.types";
import ResponseHelper from "@/helpers/responseHelper";

class MilestoneController {
  private milestoneService: MilestoneService;

  constructor() {
    this.milestoneService = new MilestoneService();
  }

  public async getMilestones(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Milestone.FindByUserIdProps = req.body;
      const milestones = await this.milestoneService.getMilestones({ user_id: params.user_id });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: milestones,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async createMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Milestone.Controller.CreateProps = req.body;
      await this.milestoneService.createMilestone({
        user_id: params.user_id,
        account_id: params.account_id,
        name: params.name,
        target_amount: params.target_amount,
        start_date: params.start_date,
        end_date: params.end_date,
        status: params.status,
      });
      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async updateMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Milestone.Controller.UpdateProps = req.body;
      await this.milestoneService.updateMilestone({
        _id: params._id,
        user_id: params.user_id,
        account_id: params.account_id,
        name: params.name,
        target_amount: params.target_amount,
        start_date: params.start_date,
        end_date: params.end_date,
        status: params.status,
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async deleteMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Milestone.Controller.DeleteProps = req.body;
      await this.milestoneService.deleteMilestone({ _id: params._id, user_id: params.user_id });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default MilestoneController;
