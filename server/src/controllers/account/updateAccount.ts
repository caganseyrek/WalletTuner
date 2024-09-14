import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const updateAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountName, accountId } = req.body;
    if (!accountName) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const currentAccountDetails = await accountModel.findById(accountId).exec();
    if (!currentAccountDetails) {
      console.error(errorMessage(updateAccountController.name, "line_21"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    const update = await accountModel
      .findByIdAndUpdate(accountId, {
        belongsToUser: currentUser,
        accountName: accountName,
        createdAt: currentAccountDetails.createdAt,
        balance: currentAccountDetails.balance,
        monthlyIncome: currentAccountDetails.monthlyIncome,
        monthlyExpense: currentAccountDetails.monthlyExpense,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateAccountController.name, "line_40"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: accountMessages.updateAccount.updateSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(updateAccountController.name, "line_54", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default updateAccountController;
