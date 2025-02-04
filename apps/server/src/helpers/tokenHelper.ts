import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";

import config from "@/app/config";

type TokenType = "access" | "refresh";

interface TokenHelperParams {
  type: TokenType;
  token: string;
}

class TokenHelper {
  private static getSecret(tokenType: TokenType): string {
    return tokenType === "access" ? config.SECRETS.JWT_ACCESS : config.SECRETS.JWT_REFRESH;
  }

  public static generate({ type, token: payload }: TokenHelperParams): string {
    return jwt.sign({ data: payload }, this.getSecret(type), {
      expiresIn: type === "access" ? "15min" : "2 day",
    });
  }

  public static getUserId({ type, token }: TokenHelperParams): string {
    const payload: jwt.JwtPayload | string = jwt.verify(token, this.getSecret(type));
    if (typeof payload === "object" && payload.data) {
      return String(payload.data);
    } else {
      throw new UnauthorizedError();
    }
  }

  public static verify({ type, token }: TokenHelperParams): void {
    try {
      this.getUserId({ type: type, token: token });
    } catch {
      throw new UnauthorizedError();
    }
  }
}

export default TokenHelper;
