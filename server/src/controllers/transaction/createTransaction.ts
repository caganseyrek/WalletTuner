import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";
import mongoose from "mongoose";

import transactionModel from "@/models/transactionModel";

import { errorMessage, statusMessages, transactionMessages } from "@/localization/messages.en";

const createTransactionController = async (req: Request, res: Response) => {
  try {
    const {
      currentUser,
      accountId,
      transactionType,
      transactionDescription,
      transactionDateTime,
      transactionValue,
    } = req.body;
    if (
      !accountId ||
      !transactionType ||
      !transactionValue ||
      !transactionDateTime ||
      !transactionDescription
    ) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const newTransaction = new transactionModel({
      _id: new mongoose.Types.ObjectId(),
      belongsToAccount: accountId,
      belongsToUser: currentUser,
      transactionType: transactionType,
      transactionDescription: transactionDescription,
      transactionDatetime: transactionDateTime,
      transactionValue: transactionValue,
    });

    const saveNewTransaction = await newTransaction.save();
    if (!saveNewTransaction) {
      console.error(errorMessage(createTransactionController.name, "line_45"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    return res.status(statusCodes.created).json({
      isSuccess: true,
      message: transactionMessages.createTransaction.creationSuccessfull,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(createTransactionController.name, "line_59", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default createTransactionController;
