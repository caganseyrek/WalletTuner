import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const deleteTransactionController = async (req: Request, res: Response) => {
  try {
    const { currentUser, transactionId } = req.body;

    const deleteTransaction = await transactionModel
      .findOneAndDelete({ _id: transactionId, belongsToUser: currentUser })
      .exec();
    if (!deleteTransaction) {
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: transactionMessages.deleteTransaction.deletionSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(deleteTransactionController.name, "line_29", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default deleteTransactionController;
