import { NextFunction, Request, Response } from "express";

import STATUS_CODES from "@/constants/statusCodes";

import TransactionService from "./transaction.service";
import { Transaction } from "./transaction.types";
import ResponseHelper from "@/helpers/responseHelper";

class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Transaction.FindByUserIdProps = req.body;
      const transactions = await this.transactionService.getTransactions({ user_id: params.user_id });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: transactions,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Transaction.Controller.CreateProps = req.body;
      await this.transactionService.createTransaction({
        user_id: params.user_id,
        account_id: params.account_id,
        type: params.type,
        amount: params.amount,
        timestamp: params.timestamp,
        note: params.note,
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

  public async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Transaction.Controller.UpdateProps = req.body;
      await this.transactionService.updateTransaction({
        _id: params._id,
        user_id: params.user_id,
        account_id: params.account_id,
        type: params.type,
        amount: params.amount,
        timestamp: params.timestamp,
        note: params.note,
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

  public async deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Transaction.Controller.DeleteProps = req.body;
      await this.transactionService.deleteTransaction({ _id: params._id, user_id: params.user_id });
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

export default TransactionController;
