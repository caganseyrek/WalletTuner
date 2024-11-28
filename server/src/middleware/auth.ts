import { NextFunction, Request, Response } from "express";

import ResponseHelper from "@/utils/responseHelper";
import statusCodes from "@/utils/statusCodes";
import TokenHelper from "@/utils/tokenHelper";
import TranslationHelper from "@/utils/translationHelper";

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
        ResponseHelper.generateResponse({
          isSuccess: false,
          message: TranslationHelper.translate(req, "statusMessages.expiredToken"),
          data: null,
        }),
      );
    }
  }
  return res.status(statusCodes.unauthorized).json(
    ResponseHelper.generateResponse({
      isSuccess: false,
      message: TranslationHelper.translate(req, "statusMessages.unauthorized"),
      data: null,
    }),
  );
};
