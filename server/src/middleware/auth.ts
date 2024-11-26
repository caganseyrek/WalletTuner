import { NextFunction, Request, Response } from "express";

import generateResponse from "@/utils/responseHandler";
import statusCodes from "@/utils/statusCodes";
import TokenHelper from "@/utils/tokenHelper";

export default (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.toString();
  if (token) {
    try {
      const tokenValue = token.split(" ")[1];
      const decodedToken = TokenHelper.verify({ tokenValue: tokenValue, tokenType: "access" });
      req.body.user = decodedToken;
      return next();
    } catch {
      return res.status(statusCodes.unauthorized).json(
        generateResponse({
          isSuccess: false,
          message: req.t("statusMessages.expiredToken"),
          data: null,
        }),
      );
    }
  }
  return res.status(statusCodes.unauthorized).json(
    generateResponse({
      isSuccess: false,
      message: req.t("statusMessages.unauthorized"),
      data: null,
    }),
  );
};
