import { NextFunction, Request, Response } from "express";

import TokenService from "@/services/tokenService";

import ResponseHelper from "@/utils/responseHelper";
import statusCodes from "@/utils/statusCodes";

import TokenTypes from "@/types/token";

const tokenService = new TokenService();

async function newAccessToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentUser, refreshToken }: TokenTypes.NewTokenParams = req.body;
    const newAccessToken = await tokenService.newAccessToken({
      currentUser: currentUser,
      refreshToken: refreshToken,
    });
    return res.status(statusCodes.success).json(
      ResponseHelper.generateResponse({
        isSuccess: true,
        message: "",
        data: { accessToken: newAccessToken },
      }),
    );
  } catch (error) {
    next(error);
  }
}

export default { newAccessToken };
