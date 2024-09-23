import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { errorMessage } from "@/localization/i18n";

const updateAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountName, accountId } = req.body;
    if (!accountName) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const currentAccountDetails = await accountModel.findById(accountId).exec();
    if (!currentAccountDetails) {
      console.error(errorMessage(updateAccountController.name, "line_21"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
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
      console.error(errorMessage(updateAccountController.name, "line_49"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("account.success.updateSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(updateAccountController.name, "line_63", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default updateAccountController;
