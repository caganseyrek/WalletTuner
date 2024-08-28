import { Request, Response } from "express";

import accountModel from "@/models/accountModel";
import transactionModel from "@/models/transactionModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const deleteAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountId } = req.body;

    const filters = {
      _id: accountId,
      belongsToUser: currentUser,
    };

    const deleteAccount = await accountModel.findOneAndDelete(filters).exec();
    if (!deleteAccount) {
      console.error(errorMessage(deleteAccountController.name, "line_19"));
      return res.status(500).send(statusMessages.internalerror);
    }

    const relatedTransactions = await transactionModel.find({ belongsToAccount: accountId }).exec();
    if (relatedTransactions) {
      relatedTransactions.forEach(async (transaction) => {
        try {
          await transactionModel.findByIdAndDelete(transaction._id).exec();
        } catch (error) {
          console.error(errorMessage(deleteAccountController.name, "line_29", error));
        }
      });
    }

    return res.status(200).send(accountMessages.deleteAccount.deletionSuccessful);
  } catch (error) {
    console.error(errorMessage(deleteAccountController.name, "line_36", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default deleteAccountController;
