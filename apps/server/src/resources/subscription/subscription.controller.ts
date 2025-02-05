import { NextFunction, Request, Response } from "express";

import STATUS_CODES from "@/constants/statusCodes";

import SubscriptionService from "./subscription.service";
import { Subscription } from "./subscription.types";
import ResponseHelper from "@/helpers/responseHelper";

class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  public async getSubscriptions(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Subscription.FindByUserIdProps = req.body;
      const subscriptions = await this.subscriptionService.getSubscriptions({ user_id: params.user_id });
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
        user_id: params.user_id,
        name: params.name,
        amount: params.amount,
        billing_cycle: params.billing_cycle,
        next_payment_date: params.next_payment_date,
        paid_from: params.paid_from,
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
        _id: params._id,
        user_id: params.user_id,
        name: params.name,
        amount: params.amount,
        billing_cycle: params.billing_cycle,
        next_payment_date: params.next_payment_date,
        paid_from: params.paid_from,
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
      await this.subscriptionService.deleteSubscription({ _id: params._id, user_id: params.user_id });
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
