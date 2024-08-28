import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const getAccountsController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const accounts = await accountModel.find({ belongsToUser: currentUser }).exec();
    if (!accounts) {
      return res.status(404).send(accountMessages.getAccounts.noAccountsFound);
    }

    return res.status(200).send(accounts);
  } catch (error) {
    console.error(errorMessage(getAccountsController.name, "line_18", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default getAccountsController;
