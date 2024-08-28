import { Request, Response } from "express";
import mongoose from "mongoose";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const createTransactionController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountId, transactionType, description, value } = req.body;
    if (!accountId || !transactionType || !value) {
      return res.status(400).send(statusMessages.badrequest);
    }

    const newTransaction = new transactionModel({
      _id: new mongoose.Types.ObjectId(),
      belongsToAccount: accountId,
      belongsToUser: currentUser,
      transactionType: transactionType,
      description: description ?? "",
      datetime: new Date().toISOString(),
      value: value,
    });

    const saveNewTransaction = await newTransaction.save();
    if (!saveNewTransaction) {
      console.error(errorMessage(createTransactionController.name, "line_27"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(201).send(transactionMessages.createTransaction.creationSuccessfull);
  } catch (error) {
    console.error(errorMessage(createTransactionController.name, "line_33", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default createTransactionController;
