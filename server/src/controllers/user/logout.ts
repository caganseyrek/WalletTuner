import statusCodes from "@/shared/statusCodes";
import { IdentifierProps, TokenProps } from "@/shared/types";
import { Request, Response } from "express";

import tokenModel from "@/models/tokenModel";

import { errorMessage } from "@/localization/i18n";

const logoutController = async (req: Request, res: Response) => {
  try {
    const { currentUser }: IdentifierProps = req.body;

    const refreshTokens: TokenProps[] = await tokenModel.find({ belongsTo: currentUser }).exec();
    if (refreshTokens.length >= 1) {
      refreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch {
          console.error(errorMessage(logoutController.name, "line_19"));
        }
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
    });

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("user.success.logoutSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(logoutController.name, "line_36", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default logoutController;
