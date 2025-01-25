import { NextFunction, Request, Response } from "express";

import TransactionService from "@/services/transactionService";

import STATUS_CODES from "@/utils/constants/statusCodes";
import ResponseHelper from "@/utils/helpers/responseHelper";
import TokenHelper from "@/utils/helpers/tokenHelper";

import TransactionTypes from "@/types/transactions";

class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  public async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const transactions = await this.transactionService.getTransactions({ userId: userId });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "",
          data: transactions,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const {
        accountId,
        transactionType,
        transactionDescription,
        transactionDateTime,
        transactionValue,
      }: TransactionTypes.Controller.CreateTransactionParams = req.body;
      await this.transactionService.createTransaction({
        userId: userId,
        accountId: accountId,
        transactionType: transactionType,
        transactionDescription: transactionDescription,
        transactionDateTime: transactionDateTime,
        transactionValue: transactionValue,
      });

      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "transaction.success.creationSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const {
        accountId,
        transactionId,
        transactionType,
        transactionDescription,
        transactionDateTime,
        transactionValue,
      }: TransactionTypes.Controller.UpdateTransactionParams = req.body;
      await this.transactionService.updateTransaction({
        userId: userId,
        accountId: accountId,
        transactionId: transactionId,
        transactionType: transactionType,
        transactionDescription: transactionDescription,
        transactionDateTime: transactionDateTime,
        transactionValue: transactionValue,
      });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "transaction.success.updateSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const { transactionId }: TransactionTypes.Controller.DeleteTransactionParams = req.body;
      await this.transactionService.deleteTransaction({ userId: userId, transactionId: transactionId });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "transaction.success.deletionSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;
