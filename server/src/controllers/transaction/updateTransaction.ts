import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const updateTransactionController = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const {
      currentUser,
      belongsToUser,
      belongsToAccount,
      transactionType,
      transactionDescription,
      transactionDatetime,
      transactionValue,
    } = req.body;
    if (belongsToUser) {
      return res.status(400).send(statusMessages.badrequest);
    }

    const update = await transactionModel
      .findByIdAndUpdate(transactionId, {
        belongsToAccount: belongsToAccount,
        belongsToUser: currentUser,
        transactionType: transactionType,
        transactionDescription: transactionDescription ?? "",
        transactionDatetime: transactionDatetime,
        transactionValue: transactionValue,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateTransactionController.name, "line_34"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(200).send(transactionMessages.updateTransaction.updateSuccessful);
  } catch (error) {
    console.error(errorMessage(updateTransactionController.name, "line_40", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default updateTransactionController;
