import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default (req: Request, _res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = verify(token, process.env.JWT_ACCESS_SECRET as string);
    req.body.user = decoded; // undefined if cannot be decoded
  }
  next();
};
