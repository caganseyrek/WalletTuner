import jwt from "jsonwebtoken";

import config from "@/app/config";
import { UnauthorizedError } from "@/app/error/errors";

type TokenType = "access" | "refresh";

interface TokenHelperParams {
  type: TokenType;
  payload: string;
}

class TokenHelper {
  private static getSecret(tokenType: TokenType): string {
    return tokenType === "access" ? config.SECRETS.JWT_ACCESS : config.SECRETS.JWT_REFRESH;
  }

  public static generate({ type, payload }: TokenHelperParams): string {
    return jwt.sign({ data: payload }, this.getSecret(type), {
      expiresIn: type === "access" ? "15min" : "2 day",
    });
  }

  public static getUserId({ type, payload: token }: TokenHelperParams): string {
    const payload: jwt.JwtPayload | string = this.verify({ type: type, payload: token });
    if (typeof payload === "object" && payload.data && String(payload.data).trim() !== "") {
      return String(payload.data);
    } else {
      throw new UnauthorizedError();
    }
  }

  public static verify({ type, payload: token }: TokenHelperParams): jwt.JwtPayload | string {
    try {
      return jwt.verify(token, this.getSecret(type));
    } catch {
      throw new UnauthorizedError();
    }
  }
}

export default TokenHelper;
