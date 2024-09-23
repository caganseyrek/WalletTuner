import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";
import mongoose from "mongoose";

import accountModel from "@/models/accountModel";

import { errorMessage } from "@/localization/i18n";

const createAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountName } = req.body;
    if (!accountName) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const doesAccountExists = await accountModel.find({ accountName: accountName }).exec();
    if (doesAccountExists.length > 0) {
      return res.status(statusCodes.conflict).json({
        isSuccess: false,
        message: req.t("account.error.accountExists"),
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
      console.error(errorMessage(createAccountController.name, "line_41"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.created).json({
      isSuccess: true,
      message: req.t("accountModel.success.creationSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(createAccountController.name, "line_55", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default createAccountController;
