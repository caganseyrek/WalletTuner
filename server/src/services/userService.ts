import mongoose from "mongoose";

import TokenRepository from "@/repositories/tokenRepository";
import UserRepository from "@/repositories/userRepository";

import STATUS_CODES from "@/utils/constants/statusCodes";
import config from "@/utils/helpers/configHelper";
import AppError from "@/utils/helpers/errorHelper";
import PasswordHelper from "@/utils/helpers/passwordHelper";
import TokenHelper from "@/utils/helpers/tokenHelper";

import TokenTypes from "@/types/token";
import UserTypes from "@/types/user";

class UserService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();
  }

  async loginUser({ response, email, password }: UserTypes.LoginUserParams): Promise<UserTypes.LoginDetailsObject> {
    const userExists: UserTypes.UserObject[] | null = await this.userRepository.findByEmail({ email: email });
    if (!userExists || userExists.length !== 1) {
      throw new AppError({
        statusCode: STATUS_CODES.unauthorized.code,
        message: "user.error.wrongEmailOrPassword",
      });
    }
    const userDetails: UserTypes.UserObject = userExists[0];
    const passwordMatch: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: userDetails.password,
    });
    if (!passwordMatch) {
      throw new AppError({
        statusCode: STATUS_CODES.unauthorized.code,
        message: "user.error.wrongEmailOrPassword",
      });
    }
    await this.clearExistingTokensByUserId({ userId: userDetails._id });
    const refreshToken: string = TokenHelper.generate({
      payload: userDetails._id + "&" + new Date().toISOString(),
      tokenType: "refresh",
    });
    const accessToken: string = TokenHelper.generate({
      payload: userDetails._id + "&" + new Date().toISOString(),
      tokenType: "access",
    });
    await this.tokenRepository.saveNewToken({ userId: userDetails._id, refreshToken: refreshToken });
    response.cookie("refreshToken", refreshToken, {
      domain: config.CLIENT_URL + "api/auth/newAccessToken",
      httpOnly: true,
      maxAge: 60000 * 60 * 24 * 1,
      signed: true,
    });
    response.cookie("accessToken", accessToken, {
      domain: config.CLIENT_URL,
      httpOnly: true,
      maxAge: 60000 * 60 * 24 * 1,
      signed: true,
    });
    return { name: userDetails.name };
  }

  async logoutUser({ response, userId }: UserTypes.LogoutUserParams): Promise<void> {
    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");
    await this.clearExistingTokensByUserId({ userId: userId });
    return;
  }

  async createUser({ name, surname, email, password }: UserTypes.Service.RegisterUserParams): Promise<void> {
    const existingUser: UserTypes.UserObject[] = await this.userRepository.findByEmail({
      email: email,
    });
    if (existingUser && existingUser.length > 0) {
      throw new AppError({
        statusCode: STATUS_CODES.conflict.code,
        message: "user.error.userExists",
      });
    }
    const hashedPassword = await PasswordHelper.hash({ password: password });
    const newUserObject = {
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    };
    await this.userRepository.createNewUser(newUserObject);
    return;
  }

  async updateUser({
    userId,
    name,
    surname,
    email,
    password,
    preferredFormat,
    preferredCurrency,
    preferredCurrencyDisplay,
  }: UserTypes.Service.UpdateUserParams): Promise<void> {
    const userDetails: UserTypes.UserObject | null = await this.userRepository.findById({
      userId: userId,
    });
    if (!userDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    const passwordMatch: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: userDetails.password,
    });
    if (!passwordMatch) {
      throw new AppError({
        statusCode: STATUS_CODES.unauthorized.code,
        message: "user.error.passwordValidationFail",
      });
    }
    const updatedUserDetails: Omit<UserTypes.Service.UpdateUserParams, "password"> = {
      userId: userId,
      name: name,
      surname: surname,
      email: email,
      preferredFormat: preferredFormat,
      preferredCurrency: preferredCurrency,
      preferredCurrencyDisplay: preferredCurrencyDisplay,
    };
    await this.userRepository.updateUser({ updatedUserDetails: updatedUserDetails });
    return;
  }

  async deleteUser({ userId, password }: UserTypes.Service.DeleteUserParams): Promise<void> {
    const userDetails: UserTypes.UserObject | null = await this.userRepository.findById({
      userId: userId,
    });
    if (!userDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    const validatePassword: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: userDetails.password,
    });
    if (!validatePassword) {
      throw new AppError({
        statusCode: STATUS_CODES.unauthorized.code,
        message: "user.error.passwordValidationFail",
      });
    }
    await this.userRepository.deleteUser({ userId: userId });
    return;
  }

  async getUserSettings({
    userId,
  }: UserTypes.Service.GetUserSettingsParams): Promise<UserTypes.Settings.UserSettingsObject> {
    const userDetails: UserTypes.Settings.UserWithSettingsObject | null =
      await this.userRepository.findWithSettingsById({
        userId: userId,
      });
    if (!userDetails) {
      throw new AppError({
        statusCode: STATUS_CODES.internalServerError.code,
        message: STATUS_CODES.internalServerError.message,
      });
    }
    return {
      preferredFormat: userDetails.preferredFormat,
      preferredCurrency: userDetails.preferredCurrency,
      preferredCurrencyDisplay: userDetails.preferredCurrencyDisplay,
    };
  }

  async newAccessToken({ response, userId, refreshToken }: TokenTypes.NewTokenParams): Promise<void> {
    const isTokenSaved = await this.tokenRepository.findTokenByFilters({
      belongsTo: new mongoose.Types.ObjectId(userId),
      refreshToken: refreshToken,
    });
    if (!isTokenSaved) {
      throw new AppError({
        statusCode: STATUS_CODES.unauthorized.code,
        message: "token.refreshTokenExpired",
      });
    }
    const isRefreshTokenValid = TokenHelper.verify({ tokenValue: refreshToken, tokenType: "refresh" });
    if (!isRefreshTokenValid) {
      throw new AppError({
        statusCode: STATUS_CODES.unauthorized.code,
        message: "token.refreshTokenExpired",
      });
    }
    await this.clearExistingTokensByUserId({ userId: userId });
    const newAccessToken: string = TokenHelper.generate({
      payload: userId + "&" + new Date().toISOString(),
      tokenType: "access",
    });
    response.cookie("accessToken", newAccessToken, {
      domain: config.CLIENT_URL,
      httpOnly: true,
      maxAge: 60000 * 60 * 24 * 1,
      signed: true,
    });
    return;
  }

  private async clearExistingTokensByUserId({ userId }: TokenTypes.ClearExistingTokensParams) {
    const existingRefreshTokens: TokenTypes.TokenObject[] = await this.tokenRepository.findTokensByUserId({
      belongsTo: userId,
    });
    if (existingRefreshTokens.length >= 1) {
      existingRefreshTokens.forEach(async (token) => {
        try {
          await this.tokenRepository.deleteToken({ userId: token.belongsTo.toString() });
        } catch {
          throw new AppError({
            statusCode: STATUS_CODES.internalServerError.code,
            message: "statusMessages.internalError",
          });
        }
      });
    }
    return;
  }
}

export default UserService;
