import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const getTransactionsController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const transactions = await transactionModel.find({ belongsToUser: currentUser }).exec();
    if (!transactions) {
      return res.status(statusCodes.notFound).json({
        isSuccess: false,
        message: transactionMessages.getTransactions.noTransactionsFound,
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: transactions,
    });
  } catch (error) {
    console.error(errorMessage(getTransactionsController.name, "line_29", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default getTransactionsController;
