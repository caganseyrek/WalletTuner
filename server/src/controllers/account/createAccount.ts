import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const createAccountController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser, accountName } = req.body;
    if (!accountName) return res.status(400).send(statusMessages.badrequest);

    const newAccount = new accountModel({
      _id: new mongoose.Types.ObjectId(),
      belongsToUser: currentUser,
      name: accountName,
      createdAt: new Date().toISOString(),
      balance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
    });

    const saveNewAccount = await newAccount.save();
    if (!saveNewAccount) {
      console.error(errorMessage(createAccountController.name, "line_25"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(201).send(accountMessages.createAccount.creationSuccessful);
  } catch (error) {
    console.error(errorMessage(createAccountController.name, "line_31", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default createAccountController;
