import statusCodes from "@/shared/statusCodes";
import { NextFunction, Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { errorMessage } from "@/localization/i18n";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { accountId } = req.body;
  if (accountId) {
    try {
      const validateAccountId = await accountModel.findById(accountId);
      if (validateAccountId) {
        return next();
      }
      return res.status(statusCodes.notFound).send({
        isSuccess: false,
        message: req.t("middleware.noAccountsFound"),
        data: null,
      });
    } catch (error) {
      console.error(errorMessage("validateAccount", "line_22", error, true));
      return res.status(statusCodes.internalServerError).send({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }
  }
  return res.status(statusCodes.badRequest).send({
    isSuccess: false,
    message: req.t("statusMessages.badrequest"),
    data: null,
  });
};
