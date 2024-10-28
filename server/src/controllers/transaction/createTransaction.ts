import statusCodes from "@/shared/statusCodes";
import { AccountProps, CreateTransactionProps, TransactionProps } from "@/shared/types";
import { Request, Response } from "express";
import mongoose from "mongoose";

import accountModel from "@/models/accountModel";
import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const createTransactionController = async (req: Request, res: Response) => {
  try {
    const {
      currentUser,
      accountId,
      transactionType,
      transactionDescription,
      transactionDateTime,
      transactionValue,
    }: CreateTransactionProps = req.body;
    if (
      !accountId ||
      !transactionType ||
      !transactionValue ||
      !transactionDateTime ||
      !transactionDescription ||
      (transactionType !== "inc" && transactionType !== "exp")
    ) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const newTransaction = new transactionModel<TransactionProps>({
      _id: new mongoose.Types.ObjectId(),
      accountId: accountId,
      belongsToUser: currentUser,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDateTime: transactionDateTime,
      transactionValue: transactionValue,
    });

    const saveNewTransaction = await newTransaction.save();
    if (!saveNewTransaction) {
      console.error(errorMessage(createTransactionController.name, "line_47"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }
    const currentAccountDetails: AccountProps = await accountModel.findById(accountId).exec();
    if (!currentAccountDetails) {
      console.error(errorMessage(createTransactionController.name, "line_56"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const newAccountBalance: number =
      currentAccountDetails.balance +
      (transactionType === "inc" ? transactionValue : -transactionValue);

    const updateAccountDetails = await accountModel
      .findByIdAndUpdate(accountId, {
        belongsToUser: currentUser,
        accountName: currentAccountDetails.accountName,
        createdAt: currentAccountDetails.createdAt,
        balance: newAccountBalance,
        totalIncome:
          transactionType === "inc"
            ? currentAccountDetails.totalIncome + transactionValue
            : currentAccountDetails.totalIncome,
        totalExpense:
          transactionType === "exp"
            ? currentAccountDetails.totalExpense + transactionValue
            : currentAccountDetails.totalExpense,
      })
      .exec();
    if (!updateAccountDetails) {
      console.error(errorMessage(createTransactionController.name, "line_85"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.created).json({
      isSuccess: true,
      message: req.t("transaction.success.creationSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(createTransactionController.name, "line_99", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default createTransactionController;
