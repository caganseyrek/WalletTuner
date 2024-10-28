import statusCodes from "@/shared/statusCodes";
import { AccountProps, TransactionProps, UpdateTransactionProps } from "@/shared/types";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";
import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const updateTransactionController = async (req: Request, res: Response) => {
  try {
    const {
      currentUser,
      accountId,
      transactionId,
      transactionType,
      transactionDescription,
      transactionDateTime,
      transactionValue,
    }: UpdateTransactionProps = req.body;
    if (transactionType !== "inc" && transactionType !== "exp") {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const currentTransactionDetails: TransactionProps = await transactionModel
      .findById(transactionId)
      .exec();
    if (!currentTransactionDetails) {
      console.error(errorMessage(updateTransactionController.name, "line_30"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const currentAccountDetails: AccountProps = await accountModel.findById(accountId).exec();
    if (!currentAccountDetails) {
      console.error(errorMessage(updateTransactionController.name, "line_40"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    let newAccountBalance = currentAccountDetails.balance;
    newAccountBalance -=
      transactionType === "inc"
        ? currentTransactionDetails.transactionValue
        : -currentTransactionDetails.transactionValue;
    newAccountBalance += transactionType === "inc" ? transactionValue : -transactionValue;

    let newTotalIncome = currentAccountDetails.totalIncome;
    let newTotalExpense = currentAccountDetails.totalExpense;
    const currentTransactionVal = currentTransactionDetails.transactionValue;

    if (currentTransactionDetails.transactionType === transactionType) {
      if (transactionType === "inc") {
        newTotalIncome += transactionValue - currentTransactionVal;
      }
      if (transactionType === "exp") {
        newTotalExpense += transactionValue - currentTransactionVal;
      }
    } else {
      if (currentTransactionDetails.transactionType === "exp" && transactionType === "inc") {
        newTotalExpense -= currentTransactionVal;
        newTotalIncome += transactionValue;
      }
      if (currentTransactionDetails.transactionType === "inc" && transactionType === "exp") {
        newTotalIncome -= currentTransactionVal;
        newTotalExpense += transactionValue;
      }
    }

    const updateAccount: AccountProps = await accountModel
      .findByIdAndUpdate(accountId, {
        ...currentAccountDetails,
        balance: newAccountBalance,
        totalIncome: newTotalIncome,
        totalExpense: newTotalExpense,
      })
      .exec();
    if (!updateAccount) {
      console.error(errorMessage(updateTransactionController.name, "line_88"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const update: TransactionProps = await transactionModel
      .findByIdAndUpdate(transactionId, {
        accountId: accountId,
        belongsToUser: currentUser,
        transactionType: transactionType,
        transactionDescription: transactionDescription,
        transactionDateTime: transactionDateTime,
        transactionValue: transactionValue,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateTransactionController.name, "line_107"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("transaction.success.updateSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(updateTransactionController.name, "line_121", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default updateTransactionController;
