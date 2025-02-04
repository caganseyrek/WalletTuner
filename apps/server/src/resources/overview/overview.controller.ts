import { NextFunction, Request, Response } from "express";

import ResponseHelper from "@/app/response";

import OverviewService from "@/resources/overview/overview.service";

import STATUS_CODES from "@/constants/statusCodes";

import { Overview } from "./overview.types";

class OverviewController {
  private overviewService: OverviewService;

  constructor() {
    this.overviewService = new OverviewService();
  }

  public async getOverviews(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: string = req.cookies.user_id;
      const overview: Overview.OverviewProps = await this.overviewService.getOverview({
        user_id: user_id,
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.response({
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
