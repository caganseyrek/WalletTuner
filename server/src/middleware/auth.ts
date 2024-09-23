import statusCodes from "@/shared/statusCodes";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.toString();
  if (token) {
    try {
      const tokenValue = token.split(" ")[1];
      const decoded = verify(tokenValue, process.env.JWT_ACCESS_SECRET as string);
      req.body.user = decoded;
      return next();
    } catch {
      return res.status(statusCodes.unauthorized).send({
        isSuccess: false,
        message: req.t("statusMessages.expiredToken"),
        data: null,
      });
    }
  }
  return res.status(statusCodes.unauthorized).send({
    isSuccess: false,
    message: req.t("statusMessages.unauthorized"),
    data: null,
  });
};
