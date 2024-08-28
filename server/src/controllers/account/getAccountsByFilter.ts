import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const getAccountsByFilterController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;
    const { accountId, accountType } = req.params;

    const filters = {
      _id: accountId,
      belongsToUser: currentUser,
      accountType: accountType,
    };

    const accounts = await accountModel.find(filters).exec();
    if (!accounts) {
      return res.status(404).send(accountMessages.getAccounts.noAccountsFound);
    }

    return res.status(200).send(accounts);
  } catch (error) {
    console.error(errorMessage(getAccountsByFilterController.name, "line_25", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getAccountsByFilterController;
