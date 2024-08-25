import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage, middlewareMessages, statusMessages } from "@/localization/messages.en";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { transactionId } = req.body;
  if (transactionId) {
    try {
      const validateTransactionId = await transactionModel.findById(transactionId);
      if (validateTransactionId) return next();
      return res.status(400).send(middlewareMessages.validateTransaction);
    } catch (error) {
      console.error(errorMessage("validateTransaction", "line_15", error, true));
      return res.status(400).send(statusMessages.badrequest);
    }
  }
  return res.status(400).send(statusMessages.badrequest);
};
