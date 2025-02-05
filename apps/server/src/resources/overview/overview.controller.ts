import { NextFunction, Request, Response } from "express";

import OverviewService from "@/resources/overview/overview.service";

import STATUS_CODES from "@/constants/statusCodes";

import { Overview } from "./overview.types";
import ResponseHelper from "@/helpers/responseHelper";

class OverviewController {
  private overviewService: OverviewService;

  constructor() {
    this.overviewService = new OverviewService();
  }

  public async getOverviews(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Overview.FindByUserIdProps = req.body;
      const overview: Overview.OverviewProps = await this.overviewService.getOverview({ user_id: params.user_id });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: overview,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default OverviewController;
