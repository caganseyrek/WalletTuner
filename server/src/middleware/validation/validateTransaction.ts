import statusCodes from "@/shared/statusCodes";
import { NextFunction, Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { transactionId } = req.body;
  if (transactionId) {
    try {
      const validateTransactionId = await transactionModel.findById(transactionId);
      if (validateTransactionId) {
        return next();
      }
      return res.status(statusCodes.notFound).send({
        isSuccess: false,
        message: req.t("middleware.validateTransaction"),
        data: null,
      });
    } catch (error) {
      console.error(errorMessage("validateTransaction", "line_22", error, true));
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
