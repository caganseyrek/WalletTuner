import statusCodes from "@/shared/statusCodes";
import { NewTokenProps, TokenProps } from "@/shared/types";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import tokenModel from "@/models/tokenModel";

import { errorMessage } from "@/localization/i18n";

const newTokenController = async (req: Request, res: Response) => {
  try {
    const { currentUser, refreshToken }: NewTokenProps = req.body;
    if (!refreshToken) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("token.noRefreshTokenReceived"),
        data: null,
      });
    }

    const isRefreshTokenExpired = verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    if (!isRefreshTokenExpired) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("token.refreshTokenExpired"),
        data: null,
      });
    }

    const filters = {
      refreshToken: refreshToken,
      belongsTo: currentUser,
    };

    const hasRefreshToken: TokenProps = await tokenModel.findOne(filters).exec();
    if (!hasRefreshToken) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("token.noRefreshTokenFound"),
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
        message: req.t("token.refreshTokenExpired"),
        data: null,
      });
    }
    if (hasRefreshToken.refreshToken !== refreshToken) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("token.invalidRefreshToken"),
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
    console.error(errorMessage(newTokenController.name, "line_76", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default newTokenController;
