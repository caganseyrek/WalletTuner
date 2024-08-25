import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const getTransactionsController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser } = req.body;

    const transactions = await transactionModel.find({ belongsToUser: currentUser }).exec();
    if (!transactions)
      return res.status(404).send(transactionMessages.getTransactions.noTransactionsFound);

    return res.status(200).send(transactions);
  } catch (error) {
    console.error(errorMessage(getTransactionsController.name, "line_17", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getTransactionsController;
