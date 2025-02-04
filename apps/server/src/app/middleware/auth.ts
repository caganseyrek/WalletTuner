import { NextFunction, Request, Response } from "express";

import TokenHelper from "@/helpers/tokenHelper";

class Auth {
  public static check(req: Request, _res: Response, next: NextFunction): void {
    const access: string = req.signedCookies.access;
    TokenHelper.verify({ type: "access", token: access });
    next();
  }
}

export default Auth;
