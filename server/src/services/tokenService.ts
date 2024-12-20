import TokenRepository from "@/repositories/tokenRepository";

import { AppError, statusCodes } from "@/helpers/responseHelper";
import TokenHelper from "@/helpers/tokenHelper";

import TokenTypes from "@/types/token";

class TokenService {
  private tokenRepository: TokenRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
  }

  async newAccessToken({ currentUser, refreshToken }: TokenTypes.NewTokenParams): Promise<string> {
    const isTokenSaved = await this.tokenRepository.findByFilters({
      belongsTo: currentUser,
      refreshToken: refreshToken,
    });
    if (!isTokenSaved) {
      throw new AppError({
        statusCode: statusCodes.unauthorized,
        message: "token.refreshTokenExpired",
      });
    }
    const isRefreshTokenValid = TokenHelper.verify({
      tokenValue: refreshToken,
      tokenType: "refresh",
    });
    if (!isRefreshTokenValid) {
      throw new AppError({
        statusCode: statusCodes.unauthorized,
        message: "token.refreshTokenExpired",
      });
    }
    await this.tokenRepository.clearExistingTokens({ currentUser: currentUser });
    await this.tokenRepository.saveNewToken({
      currentUser: currentUser,
      refreshToken: refreshToken,
    });
    const newAccessToken: string = TokenHelper.generate({
      payload: currentUser + new Date().toISOString(),
      tokenType: "access",
    });
    return newAccessToken;
  }
}

export default TokenService;
