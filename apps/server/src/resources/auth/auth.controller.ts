import { NextFunction, Request, Response } from "express";

import AuthService from "@/resources/auth/auth.service";

import Converter from "@/utils/converter";

import ResponseHelper from "@/helpers/responseHelper";

import STATUS_CODES from "@/constants/statusCodes";

import { Auth } from "./auth.types";
import { User } from "./user/user.types";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.RegisterProps = req.body;
      await this.authService.register({ full_name: params.full_name, email: params.email, password: params.password });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.LoginProps = req.body;
      const tokens: Auth.TokensObject = await this.authService.login({
        email: params.email,
        password: params.password,
      });
      res.cookie("access", tokens.accessToken, {
        signed: true,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });
      res.cookie("refresh", tokens.refreshToken, {
        signed: true,
        httpOnly: true,
        sameSite: "strict",
        path: "/api/v1/auth/newRefreshToken",
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.LogoutProps = req.body;
      await this.authService.logout({ _id: Converter.toObjectId(params.user_id) });
      res.clearCookie("access");
      res.clearCookie("refresh");
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async newAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.NewAccessTokenProps = req.body;
      const accessToken: string = await this.authService.newAccessToken({
        _id: Converter.toObjectId(params.user_id),
        refreshToken: params.refreshToken,
      });
      res.cookie("access", accessToken, {
        signed: true,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.GetUserDetailsProps = req.body;
      const userDetails: User.UserDetailsObject = await this.authService.getUserDetails({
        _id: Converter.toObjectId(params.user_id),
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: userDetails,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.UpdateUserProps = req.body;
      await this.authService.updateUser({
        _id: Converter.toObjectId(params.user_id),
        full_name: params.full_name,
      });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const params: Auth.Controller.DeleteUserProps = req.body;
      await this.authService.deleteUser({ _id: Converter.toObjectId(params.user_id) });
      return res.status(STATUS_CODES.success.code).json(
        ResponseHelper.createResponse({
          isSuccess: true,
          responseMessage: "",
          data: null,
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
