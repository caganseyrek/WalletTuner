import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const updateTransactionController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { transactionId } = req.params;
    const {
      currentUser,
      belongsToUser,
      belongsToAccount,
      transactionType,
      description,
      datetime,
      value,
    } = req.body;
    if (belongsToUser || datetime) return res.status(400).send(statusMessages.badrequest);

    const update = await transactionModel
      .findByIdAndUpdate(transactionId, {
        belongsToAccount: belongsToAccount,
        belongsToUser: currentUser,
        transactionType: transactionType,
        description: description ?? "",
        datetime: new Date().toISOString(),
        value: value,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateTransactionController.name, "line_32"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(200).send(transactionMessages.updateTransaction.updateSuccessful);
  } catch (error) {
    console.error(errorMessage(updateTransactionController.name, "line_38", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default updateTransactionController;
