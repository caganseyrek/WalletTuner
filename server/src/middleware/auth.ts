import { NextFunction, Request, Response } from "express";

import STATUS_CODES from "@/utils/constants/statusCodes";
import ResponseHelper from "@/utils/helpers/responseHelper";
import TokenHelper from "@/utils/helpers/tokenHelper";

function auth(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.cookies;
  if (accessToken) {
    try {
      TokenHelper.verify({ tokenValue: accessToken, tokenType: "access" });
      return next();
    } catch {
      return res.status(STATUS_CODES.unauthorized.code).json(
        ResponseHelper.generate({
          isSuccess: false,
          message: "statusMessages.expiredToken",
          data: null,
        }),
      );
    }
  }
  return res.status(STATUS_CODES.unauthorized.code).json(
    ResponseHelper.generate({
      isSuccess: false,
      message: "statusMessages.unauthorized",
      data: null,
    }),
  );
}

export default auth;
