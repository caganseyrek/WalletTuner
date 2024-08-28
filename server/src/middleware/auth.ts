import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { statusMessages } from "@/localization/messages.en";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.toString();
  if (token) {
    try {
      const tokenValue = token.split(" ")[1];
      const decoded = verify(tokenValue, process.env.JWT_ACCESS_SECRET as string);
      req.body.user = decoded;
      return next();
    } catch {
      return res.status(401).send(statusMessages.custom.expiredToken);
    }
  }
  return res.status(401).send(statusMessages.unauthorized);
};
