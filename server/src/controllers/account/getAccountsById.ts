import { NextFunction, Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const getAccountsByIdController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser } = req.body;
    const { accountId } = req.params;

    const filters = {
      _id: accountId,
      belongsToUser: currentUser,
    };

    const accounts = await accountModel.find(filters).exec();
    if (!accounts) return res.status(404).send(accountMessages.getAccounts.noAccountsFound);

    return res.status(200).send(accounts);
  } catch (error) {
    console.error(errorMessage(getAccountsByIdController.name, "line_22", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getAccountsByIdController;
