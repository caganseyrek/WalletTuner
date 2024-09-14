import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

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
        message: transactionMessages.getTransactionsById.noTransactionsFound,
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
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default getTransactionsByFilterController;
