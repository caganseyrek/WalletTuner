import statusCodes from "@/shared/statusCodes";
import { NextFunction, Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { currentUser } = req.body;
  if (currentUser) {
    try {
      const validateUserId = await userModel.findById(currentUser);
      if (validateUserId) {
        return next();
      }
      return res.status(statusCodes.unauthorized).send({
        isSuccess: false,
        message: req.t("middleware.invalidUserId"),
        data: null,
      });
    } catch (error) {
      console.error(errorMessage("validateUser", "line_22", error, true));
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
