import { NextFunction, Request, Response } from "express";

import UserService from "@/services/userService";

import generateResponse from "@/utils/responseHandler";
import statusCodes from "@/utils/statusCodes";

import env from "@/config/env";

import UserTypes from "@/types/user";

const userService = new UserService();

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: UserTypes.Controller.LoginUserParams = req.body;
    const loginInfo: UserTypes.Controller.LoginUserParams = {
      email: email,
      password: password,
    };
    const loginDetails: UserTypes.Globals.LoginDetails = await userService.loginUser(loginInfo);
    res.cookie("refreshToken", loginDetails.tokens.refreshToken, {
      domain: env.CLIENT_URL,
      httpOnly: true,
      maxAge: 60000 * 60 * 24 * 1,
      signed: true,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("user.success.loginSuccessful"),
        data: {
          name: loginDetails.name,
          currentUser: loginDetails.currentUser,
          accessToken: loginDetails.tokens.accessToken,
        },
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser }: UserTypes.Controller.LogoutUserParams = req.body;
    await userService.logoutUser({ currentUser: currentUser });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("user.success.logoutSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, surname, email, password }: UserTypes.Controller.RegisterUserParams = req.body;
    const userDetails: UserTypes.Controller.RegisterUserParams = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };
    await userService.createUser(userDetails);
    return res.status(statusCodes.created).json(
      generateResponse({
        isSuccess: true,
        message: req.t("user.success.registerSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      currentUser,
      name,
      surname,
      email,
      password,
      preferredFormat,
      preferredCurrency,
      preferredCurrencyDisplay,
    }: UserTypes.Controller.UpdateUserParams = req.body;
    const updatedUserDetails: UserTypes.Controller.UpdateUserParams = {
      currentUser: currentUser,
      name: name,
      surname: surname,
      email: email,
      password: password,
      preferredFormat: preferredFormat,
      preferredCurrency: preferredCurrency,
      preferredCurrencyDisplay: preferredCurrencyDisplay,
    };
    await userService.updateUser(updatedUserDetails);
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("user.success.updateSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser, password }: UserTypes.Controller.DeleteUserParams = req.body;
    await userService.deleteUser({ currentUser: currentUser, password: password });
    return res.status(statusCodes.success).json(
      generateResponse({
        isSuccess: true,
        message: req.t("user.success.deleteSuccessful"),
        data: null,
      }),
    );
  } catch (error) {
    next(error);
  }
}

async function getUserSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser }: UserTypes.Controller.GetUserSettingsParams = req.body;
    const userSettings: UserTypes.Globals.UserSettings = await userService.getUserSettings({
      currentUser: currentUser,
    });
    return res.status(statusCodes.success).json(
      generateResponse({
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

export default { loginUser, logoutUser, registerUser, updateUser, deleteUser, getUserSettings };
