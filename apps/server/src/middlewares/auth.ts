import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "@/app/error/errors";

import TokenHelper from "@/helpers/tokenHelper";

class Auth {
  public static check(req: Request, _res: Response, next: NextFunction): void {
    try {
      const access: string | undefined = req.signedCookies.wt_at;
      if (!access) {
        return next(new UnauthorizedError());
      }
      const userId: string = TokenHelper.getUserId({ type: "access", payload: access });
      req.body = { user_id: userId };
      const refresh: string | undefined = req.signedCookies.refresh;
      if (refresh) {
        TokenHelper.verify({ type: "refresh", payload: refresh });
        req.body = { refreshToken: refresh };
      }
      next();
    } catch {
      next(new UnauthorizedError());
    }
  }
}

export default Auth;
