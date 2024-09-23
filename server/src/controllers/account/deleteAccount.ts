import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";
import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const deleteAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountId } = req.body;

    const filters = {
      _id: accountId,
      belongsToUser: currentUser,
    };

    const deleteAccount = await accountModel.findOneAndDelete(filters).exec();
    if (!deleteAccount) {
      console.error(errorMessage(deleteAccountController.name, "line_20"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const relatedTransactions = await transactionModel.find({ belongsToAccount: accountId }).exec();
    if (relatedTransactions) {
      relatedTransactions.forEach(async (transaction) => {
        try {
          await transactionModel.findByIdAndDelete(transaction._id).exec();
        } catch (error) {
          console.error(errorMessage(deleteAccountController.name, "line_34", error));
        }
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("account.success.deletionSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(deleteAccountController.name, "line_45", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default deleteAccountController;
