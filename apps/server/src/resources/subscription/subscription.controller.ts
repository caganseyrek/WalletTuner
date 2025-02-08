import { Globals, Subscription } from "@wallettuner/resource-types";
import { NextFunction, Request, Response } from "express";

import Converter from "@/utils/converter";

import ResponseHelper from "@/helpers/responseHelper";

import STATUS_CODES from "@/constants/statusCodes";

import SubscriptionService from "./subscription.service";

class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  public async getSubscriptions(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Globals.UserIdFromCookie = req.body;
      const subscriptions = await this.subscriptionService.getSubscriptions({
        user_id: Converter.toObjectId(params.user_id),
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: subscriptions,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async createSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Subscription.Controller.CreateProps = req.body;
      await this.subscriptionService.createSubscription({
        user_id: Converter.toObjectId(params.user_id),
        name: params.name,
        amount: params.amount,
        billing_cycle: params.billing_cycle,
        next_payment_date: params.next_payment_date,
        paid_from: Converter.toObjectId(params.paid_from),
        is_active: params.is_active,
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

  public async updateSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Subscription.Controller.UpdateProps = req.body;
      await this.subscriptionService.updateSubscription({
        _id: Converter.toObjectId(params._id),
        user_id: Converter.toObjectId(params.user_id),
        name: params.name,
        amount: params.amount,
        billing_cycle: params.billing_cycle,
        next_payment_date: params.next_payment_date,
        paid_from: Converter.toObjectId(params.paid_from),
        is_active: params.is_active,
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

  public async deleteSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Subscription.Controller.DeleteProps = req.body;
      await this.subscriptionService.deleteSubscription({
        _id: Converter.toObjectId(params._id),
        user_id: Converter.toObjectId(params.user_id),
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
}

export default SubscriptionController;
