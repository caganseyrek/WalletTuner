import { NextFunction, Request, Response } from "express";

import tokenModel from "../../models/tokenModel";

import { errorMessage, statusMessages, userMessages } from "../../localization/messages.en";

const logoutController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser } = req.body;

    const refreshTokens = await tokenModel.find({ belongsTo: currentUser }).exec();
    if (refreshTokens.length >= 1) {
      refreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch (error) {
          console.error(errorMessage(logoutController.name, "line_17"));
        }
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
    });

    return res.status(200).send(userMessages.logout.logoutSuccessful);
  } catch (error) {
    console.error(errorMessage(logoutController.name, "line_30", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default logoutController;
