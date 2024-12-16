import jwt from "jsonwebtoken";

import env from "@/helpers/envHelper";

import { TokenHelperTypes } from "@/types/utils";

class TokenHelper {
  static generate({ payload, tokenType }: TokenHelperTypes.GenerateParams): string {
    return jwt.sign({ data: payload }, tokenType === "access" ? env.SECRETS.JWT_ACCESS : env.SECRETS.JWT_REFRESH, {
      expiresIn: tokenType === "access" ? "15min" : "1 day",
    });
  }

  static verify({ tokenValue, tokenType }: TokenHelperTypes.VerifyParams): jwt.JwtPayload | string {
    try {
      return jwt.verify(tokenValue, tokenType === "access" ? env.SECRETS.JWT_ACCESS : env.SECRETS.JWT_REFRESH);
    } catch {
      return "";
    }
  }
}

export default TokenHelper;
