import { NextFunction, Request, Response } from "express";

import UserTypes from "@/types/user";

import ResponseHelper from "@/app/response";
import STATUS_CODES from "@/constants/statusCodes";
import TokenHelper from "@/helpers/tokenHelper";
import UserService from "@/resources/user/userService";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const loginDetails: UserTypes.LoginDetailsObject = await this.userService.loginUser({
        response: res,
        email: email,
        password: password,
      });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "user.success.loginSuccessful",
          data: { fullName: loginDetails.fullName },
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      await this.userService.logoutUser({ response: res, userId: userId });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "user.success.logoutSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, password }: UserTypes.Controller.RegisterUserParams = req.body;
      const userDetails: UserTypes.Controller.RegisterUserParams = {
        fullName: fullName,
        email: email,
        password: password,
      };

      await this.userService.createUser(userDetails);

      return res.status(STATUS_CODES.created.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "user.success.registerSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const {
        email,
        fullName,
        password,
        preferredFormat,
        preferredCurrency,
        preferredCurrencyDisplay,
      }: UserTypes.Controller.UpdateUserParams = req.body;
      const updatedUserDetails: UserTypes.Controller.UpdateUserParams = {
        userId: userId,
        fullName: fullName,
        email: email,
        password: password,
        preferredFormat: preferredFormat,
        preferredCurrency: preferredCurrency,
        preferredCurrencyDisplay: preferredCurrencyDisplay,
      };
      await this.userService.updateUser(updatedUserDetails);

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "user.success.updateSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const { password }: UserTypes.Controller.DeleteUserParams = req.body;
      await this.userService.deleteUser({ userId: userId, password: password });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "user.success.deleteSuccessful",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async getUserSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      const userSettings: UserTypes.Settings.UserSettingsObject = await this.userService.getUserSettings({
        userId: userId,
      });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "",
          data: {
            preferredFormat: userSettings.preferredFormat,
            preferredCurrency: userSettings.preferredCurrency,
            preferredCurrencyDisplay: userSettings.preferredCurrencyDisplay,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async newAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = req.cookies;
      const userId: string = TokenHelper.extractUserId({ tokenValue: accessToken, tokenType: "access" });

      await this.userService.newAccessToken({
        response: res,
        userId: userId,
        refreshToken: refreshToken,
      });

      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.generate({
          isSuccess: true,
          message: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  // public async validateAuth(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     return;
  //     // eslint-disable-next-line no-unreachable
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default UserController;
