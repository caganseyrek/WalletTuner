import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import tokenModel from "@/models/tokenModel";

import { errorMessage, statusMessages, tokenMessages } from "@/localization/messages.en";

const newTokenController = async (req: Request, res: Response) => {
  try {
    const { currentUser, refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: tokenMessages.noRefreshTokenReceived,
        data: null,
      });
    }

    const isRefreshTokenExpired = verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    if (!isRefreshTokenExpired) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: tokenMessages.refreshTokenExpired,
        data: null,
      });
    }

    const filters = {
      refreshToken: refreshToken,
      belongsTo: currentUser,
    };

    const hasRefreshToken = await tokenModel.findOne(filters).exec();
    if (!hasRefreshToken) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: tokenMessages.noRefreshTokenFound,
        data: null,
      });
    }

    const isRefreshTokenValid = verify(
      hasRefreshToken.refreshToken as string,
      process.env.JWT_REFRESH_SECRET! as string,
    );

    if (!isRefreshTokenValid) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: tokenMessages.refreshTokenExpired,
        data: null,
      });
    }
    if (hasRefreshToken.refreshToken !== refreshToken) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: tokenMessages.invalidRefreshToken,
        data: null,
      });
    }

    const newAccessToken = sign(currentUser, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.error(errorMessage(newTokenController.name, "line_75", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default newTokenController;
