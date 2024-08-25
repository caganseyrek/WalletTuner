import { NextFunction, Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { errorMessage, middlewareMessages, statusMessages } from "@/localization/messages.en";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { accountId } = req.body;
  if (accountId) {
    try {
      const validateAccountId = await accountModel.findById(accountId);
      if (validateAccountId) return next();
      return res.status(404).send(middlewareMessages.validateAccount.noAccountFound);
    } catch (error) {
      console.error(errorMessage("validateAccount", "line_15", error, true));
      return res.status(500).send(statusMessages.internalerror);
    }
  }
  return res.status(400).send(statusMessages.badrequest);
};
