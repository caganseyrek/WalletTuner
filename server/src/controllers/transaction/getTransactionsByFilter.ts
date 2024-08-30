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
    if (!transactions)
      return res.status(404).send(transactionMessages.getTransactionsById.noTransactionsFound);

    return res.status(200).send(transactions);
  } catch (error) {
    console.error(errorMessage(getTransactionsByFilterController.name, "line_23", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getTransactionsByFilterController;
