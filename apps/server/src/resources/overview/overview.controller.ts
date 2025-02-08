import { Globals, Overview } from "@wallettuner/resource-types";
import { NextFunction, Request, Response } from "express";

import OverviewService from "@/resources/overview/overview.service";

import Converter from "@/utils/converter";

import ResponseHelper from "@/helpers/responseHelper";

import STATUS_CODES from "@/constants/statusCodes";

class OverviewController {
  private overviewService: OverviewService;

  constructor() {
    this.overviewService = new OverviewService();
  }

  public async getOverviews(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Globals.UserIdFromCookie = req.body;
      const overview: Overview.OverviewProps = await this.overviewService.getOverview({
        user_id: Converter.toObjectId(params.user_id),
      });
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
