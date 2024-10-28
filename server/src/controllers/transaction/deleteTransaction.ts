import statusCodes from "@/shared/statusCodes";
import { AccountProps, DeleteTransactionProps, TransactionProps } from "@/shared/types";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";
import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const deleteTransactionController = async (req: Request, res: Response) => {
  try {
    const { currentUser, transactionId }: DeleteTransactionProps = req.body;

    const transactionDetails: TransactionProps = await transactionModel
      .findById(transactionId)
      .exec();
    if (!transactionDetails) {
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const accountDetails: AccountProps = await accountModel
      .findById(transactionDetails.accountId)
      .exec();
    if (!accountDetails) {
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const deleteTransactionFromBalance: AccountProps = await accountModel
      .findOneAndUpdate(
        { _id: transactionDetails.accountId },
        {
          ...accountDetails,
          balance:
            accountDetails.balance -
            (transactionDetails.transactionType === "inc"
              ? transactionDetails.transactionValue
              : -transactionDetails.transactionValue),
          totalIncome:
            transactionDetails.transactionType === "inc"
              ? accountDetails.totalIncome - transactionDetails.transactionValue
              : accountDetails.totalIncome,
          totalExpense:
            transactionDetails.transactionType === "exp"
              ? accountDetails.totalExpense - transactionDetails.transactionValue
              : accountDetails.totalExpense,
        },
      )
      .exec();
    if (!deleteTransactionFromBalance) {
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const deleteTransaction: TransactionProps = await transactionModel
      .findOneAndDelete({ _id: transactionId, belongsToUser: currentUser })
      .exec();
    if (!deleteTransaction) {
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("transaction.success.deletionSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(deleteTransactionController.name, "line_81", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default deleteTransactionController;
