import TokenRepository from "@/repositories/tokenRepository";
import UserRepository from "@/repositories/userRepository";

import AppError from "@/utils/errorHandler";
import PasswordHelper from "@/utils/passwordHelper";
import statusCodes from "@/utils/statusCodes";
import TokenHelper from "@/utils/tokenHelper";

import { Identifier } from "@/types/global";
import UserTypes from "@/types/user";

class UserService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();
  }

  async loginUser({ email, password }: UserTypes.LoginParams): Promise<UserTypes.LoginDetails> {
    const userExists: UserTypes.UserDetails[] | null = await this.userRepository.findByEmail({
      email: email,
    });
    if (!userExists) {
      throw new AppError({
        statusCode: statusCodes.unauthorized,
        messageKey: "user.error.wrongEmailOrPassword",
      });
    }
    if (userExists.length > 0) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    const userDetails: UserTypes.UserDetails = userExists[0];
    const passwordMatch: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: userDetails.password,
    });
    if (!passwordMatch) {
      throw new AppError({
        statusCode: statusCodes.unauthorized,
        messageKey: "user.error.wrongEmailOrPassword",
      });
    }
    await this.tokenRepository.clearExistingTokens({ currentUser: userDetails._id });
    const newTokens = {
      accessToken: TokenHelper.generate({
        payload: userDetails._id + new Date().toISOString(),
        tokenType: "access",
      }),
      refreshToken: TokenHelper.generate({
        payload: userDetails._id + new Date().toISOString(),
        tokenType: "refresh",
      }),
    };
    await this.tokenRepository.saveNewToken({
      currentUser: userDetails._id,
      refreshToken: newTokens.refreshToken,
    });
    return { name: userDetails.name, currentUser: userDetails._id, tokens: newTokens };
  }

  async logoutUser({ currentUser }: Identifier): Promise<void> {
    return await this.tokenRepository.clearExistingTokens({ currentUser: currentUser });
  }

  async createUser({ name, surname, email, password }: UserTypes.RegisterParams) {
    const existingUser: UserTypes.UserDetails[] = await this.userRepository.findByEmail({
      email: email,
    });
    if (existingUser && existingUser.length > 0) {
      throw new AppError({
        statusCode: statusCodes.conflict,
        messageKey: "user.error.userExists",
      });
    }
    const hashedPassword = await PasswordHelper.hash({ password: password });
    const newUserObject = {
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    };
    return await this.userRepository.saveNewUser(newUserObject);
  }

  async updateUser({
    currentUser,
    name,
    surname,
    email,
    password,
    preferredFormat,
    preferredCurrency,
    preferredCurrencyDisplay,
  }: UserTypes.UpdateUserParams): Promise<void> {
    const userDetails: UserTypes.UserDetails | null = await this.userRepository.findById({
      currentUser: currentUser,
    });
    if (!userDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalError",
      });
    }
    const passwordMatch: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: userDetails.password,
    });
    if (!passwordMatch) {
      throw new AppError({
        statusCode: statusCodes.unauthorized,
        messageKey: "user.error.passwordValidationFail",
      });
    }
    const updatedUserDetails: Omit<UserTypes.UpdateUserParams, "password"> = {
      currentUser: currentUser,
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

  async deleteUser({ currentUser, password }: UserTypes.DeleteUserParams): Promise<void> {
    const userDetails: UserTypes.UserDetails | null = await this.userRepository.findById({
      currentUser: currentUser,
    });
    if (!userDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalServerError",
      });
    }
    const validatePassword: boolean = await PasswordHelper.compare({
      enteredPassword: password,
      hashedPassword: userDetails.password,
    });
    if (!validatePassword) {
      throw new AppError({
        statusCode: statusCodes.unauthorized,
        messageKey: "user.error.passwordValidationFail",
      });
    }
    await this.userRepository.deleteUser({ currentUser: currentUser });
    return;
  }

  async getUserSettings({
    currentUser,
  }: UserTypes.GetUserSettingsParams): Promise<UserTypes.UserSettings> {
    const userDetails: UserTypes.UserDetailsWithSettings | null =
      await this.userRepository.findWithSettingsById({
        currentUser: currentUser,
      });
    if (!userDetails) {
      throw new AppError({
        statusCode: statusCodes.internalServerError,
        messageKey: "statusMessages.internalServerError",
      });
    }
    return {
      preferredFormat: userDetails.preferredFormat,
      preferredCurrency: userDetails.preferredCurrency,
      preferredCurrencyDisplay: userDetails.preferredCurrencyDisplay,
    };
  }
}

export default UserService;
