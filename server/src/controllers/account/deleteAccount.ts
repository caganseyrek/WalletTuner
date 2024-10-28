import statusCodes from "@/shared/statusCodes";
import { AccountProps, DeleteAccountProps, TransactionProps } from "@/shared/types";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";
import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const deleteAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountId }: DeleteAccountProps = req.body;

    const relatedTransactions: TransactionProps[] = await transactionModel
      .find({ accountId: accountId })
      .exec();
    if (relatedTransactions.length > 0) {
      return res.status(statusCodes.conflict).json({
        isSuccess: false,
        message: req.t("account.error.deleteTransactionsFirst"), // FIXME snackbar shows success on frontend
        data: null,
      });
    }

    const deleteAccount: AccountProps = await accountModel
      .findOneAndDelete({ _id: accountId, belongsToUser: currentUser })
      .exec();
    if (!deleteAccount) {
      console.error(errorMessage(deleteAccountController.name, "line_29"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("account.success.deletionSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(deleteAccountController.name, "line_43", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default deleteAccountController;
