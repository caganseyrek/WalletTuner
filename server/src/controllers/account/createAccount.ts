import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";
import mongoose from "mongoose";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const createAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountName } = req.body;
    if (!accountName) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const newAccount = new accountModel({
      _id: new mongoose.Types.ObjectId(),
      belongsToUser: currentUser,
      accountName: accountName,
      createdAt: new Date().toISOString(),
      balance: 0,
      monthlyIncome: 0,
      monthlyExpense: 0,
    });

    const saveNewAccount = await newAccount.save();
    if (!saveNewAccount) {
      console.error(errorMessage(createAccountController.name, "line_32"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    return res.status(statusCodes.created).json({
      isSuccess: true,
      message: accountMessages.createAccount.creationSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(createAccountController.name, "line_46", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default createAccountController;
