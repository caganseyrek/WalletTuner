import jwt from "jsonwebtoken";

import { UtilsTypes } from "@/types/utils";

import config from "@/app/config";

class TokenHelper {
  static generate({ payload, tokenType }: UtilsTypes.TokenHelper.GenerateParams): string {
    return jwt.sign(
      { data: payload },
      tokenType === "access" ? config.SECRETS.JWT_ACCESS : config.SECRETS.JWT_REFRESH,
      {
        expiresIn: tokenType === "access" ? "15min" : "1 day",
      },
    );
  }

  static verify({ tokenValue, tokenType }: UtilsTypes.TokenHelper.VerifyParams): jwt.JwtPayload | string {
    try {
      return jwt.verify(tokenValue, tokenType === "access" ? config.SECRETS.JWT_ACCESS : config.SECRETS.JWT_REFRESH);
    } catch {
      return "";
    }
  }

  static extractUserId({ tokenValue, tokenType }: UtilsTypes.TokenHelper.VerifyParams): string {
    try {
      const payload: jwt.JwtPayload | string = this.verify({ tokenValue: tokenValue, tokenType: tokenType });
      const payloadData: string = payload.split("&");
      if (payloadData.length !== 2) {
        return "";
      }
      return payloadData[0];
    } catch {
      return "";
    }
  }
}

export default TokenHelper;
