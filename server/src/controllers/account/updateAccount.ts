import { NextFunction, Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const updateAccountController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { accountId } = req.params;
    const { currentUser, belongsToUser, name } = req.body;
    if (belongsToUser || !name) return res.status(400).send(statusMessages.badrequest);

    const currentAccountDetails = await accountModel.findById(accountId).exec();
    if (!currentAccountDetails) {
      console.error(errorMessage(updateAccountController.name, "line_15"));
      return res.status(500).send(statusMessages.internalerror);
    }

    const update = await accountModel
      .findByIdAndUpdate(accountId, {
        belongsToUser: currentUser,
        name: name,
        createdAt: currentAccountDetails.createdAt,
        balance: currentAccountDetails.balance,
        monthlyIncome: currentAccountDetails.monthlyIncome,
        monthlyExpense: currentAccountDetails.monthlyExpense,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateAccountController.name, "line_30"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(200).send(accountMessages.updateAccount.updateSuccessful);
  } catch (error) {
    console.error(errorMessage(updateAccountController.name, "line_36", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default updateAccountController;
