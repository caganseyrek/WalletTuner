import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const getTransactionsByFilterController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountId, transactionId } = req.body;

    const filters = {
      _id: transactionId,
      belongsToAccount: accountId,
      belongsToUser: currentUser,
    };

    const transactions = await transactionModel.find(filters).exec();
    if (!transactions) {
      return res.status(statusCodes.notFound).json({
        isSuccess: false,
        message: req.t("transaction.error.noTransactionsFound"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: transactions,
    });
  } catch (error) {
    console.error(errorMessage(getTransactionsByFilterController.name, "line_33", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default getTransactionsByFilterController;
