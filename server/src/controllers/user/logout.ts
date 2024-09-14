import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import tokenModel from "@/models/tokenModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const logoutController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const refreshTokens = await tokenModel.find({ belongsTo: currentUser }).exec();
    if (refreshTokens.length >= 1) {
      refreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch {
          console.error(errorMessage(logoutController.name, "line_18"));
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
      message: userMessages.logout.logoutSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(logoutController.name, "line_35", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default logoutController;
