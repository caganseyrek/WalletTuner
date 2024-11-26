import { NextFunction, Request, Response } from "express";

import TransactionService from "@/services/transactionService";

import generateResponse from "@/utils/responseHandler";
import statusCodes from "@/utils/statusCodes";

import TransactionTypes from "@/types/transactions";

const transactionService = new TransactionService();

async function getTransactions(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser }: TransactionTypes.Controller.GetTransactionsParams = req.body;
    const transactions = await transactionService.getTransactions({
      currentUser: currentUser,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: "",
        data: transactions,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      currentUser,
      accountId,
      transactionType,
      transactionDescription,
      transactionDateTime,
      transactionValue,
    }: TransactionTypes.Controller.CreateTransactionParams = req.body;
    await transactionService.createTransaction({
      currentUser: currentUser,
      accountId: accountId,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    return res.status(statusCodes.created).json(
      generateResponse({
        isSuccess: true,
        message: req.t("transaction.success.creationSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      currentUser,
      accountId,
      transactionId,
      transactionType,
      transactionDescription,
      transactionDateTime,
      transactionValue,
    }: TransactionTypes.Controller.UpdateTransactionParams = req.body;
    await transactionService.updateTransaction({
      currentUser: currentUser,
      accountId: accountId,
      transactionId: transactionId,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("transaction.success.updateSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser, transactionId }: TransactionTypes.Controller.DeleteTransactionParams = req.body;
    await transactionService.deleteTransaction({
      currentUser: currentUser,
      transactionId: transactionId,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("transaction.success.deletionSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

export default { getTransactions, createTransaction, updateTransaction, deleteTransaction };
