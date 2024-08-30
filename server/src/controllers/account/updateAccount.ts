import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const updateAccountController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountName, accountId } = req.body;
    if (!accountName) {
      return res.status(400).send(statusMessages.badrequest);
    }

    const currentAccountDetails = await accountModel.findById(accountId).exec();
    if (!currentAccountDetails) {
      console.error(errorMessage(updateAccountController.name, "line_16"));
      return res.status(500).send(statusMessages.internalerror);
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
      console.error(errorMessage(updateAccountController.name, "line_31"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(200).send(accountMessages.updateAccount.updateSuccessful);
  } catch (error) {
    console.error(errorMessage(updateAccountController.name, "line_37", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default updateAccountController;
