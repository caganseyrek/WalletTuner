import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const getTransactionsByIdController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser } = req.body;
    const { transactionId } = req.params;

    const filters = {
      _id: transactionId,
      belongsToUser: currentUser,
    };

    const transactions = await transactionModel.find(filters).exec();
    if (!transactions)
      return res.status(404).send(transactionMessages.getTransactionsById.noTransactionsFound);

    return res.status(200).send(transactions);
  } catch (error) {
    console.error(errorMessage(getTransactionsByIdController.name, "line_23", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getTransactionsByIdController;
