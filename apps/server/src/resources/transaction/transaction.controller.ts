import { NextFunction, Request, Response } from "express";

import ResponseHelper from "@/app/response";

import STATUS_CODES from "@/constants/statusCodes";

import TransactionService from "./transaction.service";
import { Transaction } from "./transaction.types";

class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id: string = req.cookies.user_id;
      const transactions = await this.transactionService.getTransactions({
        user_id: user_id,
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.response({
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
      const user_id: string = req.cookies.user_id;
      const params: Transaction.Controller.CreateProps = req.body;
      await this.transactionService.createTransaction({
        user_id: user_id,
        account_id: params.account_id,
        type: params.type,
        amount: params.amount,
        timestamp: params.timestamp,
        note: params.note,
      });
      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.response({
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
      const user_id: string = req.cookies.user_id;
      const params: Transaction.Controller.UpdateProps = req.body;
      await this.transactionService.updateTransaction({
        _id: params._id,
        user_id: user_id,
        account_id: params.account_id,
        type: params.type,
        amount: params.amount,
        timestamp: params.timestamp,
        note: params.note,
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.response({
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
      const user_id: string = req.cookies.user_id;
      const params: Transaction.Controller.DeleteProps = req.body;
      await this.transactionService.deleteTransaction({ _id: params._id, user_id: user_id });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.response({
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
