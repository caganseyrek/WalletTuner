import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const deleteTransactionController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { transactionId } = req.params;
    const { currentUser } = req.body;

    const deleteTransaction = await transactionModel
      .findOneAndDelete({ _id: transactionId, belongsToUser: currentUser })
      .exec();
    if (!deleteTransaction) return res.status(500).send(statusMessages.internalerror);

    return res.status(200).send(transactionMessages.deleteTransaction.deletionSuccessful);
  } catch (error) {
    console.error(errorMessage(deleteTransactionController.name, "line_19", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default deleteTransactionController;
