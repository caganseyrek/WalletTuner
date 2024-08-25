import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const getTransactionsByAccController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser, accountId } = req.body;

    const filter = {
      belongsToAccount: accountId,
      belongsToUser: currentUser,
    };

    const transactions = await transactionModel.find(filter).exec();
    if (!transactions)
      return res.status(404).send(transactionMessages.getTransactionsByAcc.noTransactionsFound);

    return res.status(200).send(transactions);
  } catch (error) {
    console.error(errorMessage(getTransactionsByAccController.name, "line_22", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getTransactionsByAccController;
