import { NextFunction, Request, Response } from "express";

import tokenModel from "../../models/tokenModel";
import userModel from "../../models/userModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const logoutController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { user, currentUser } = req.body;
  if (!user) return res.status(401).send(statusMessages.unauthorized);
  if (!currentUser) return res.status(400).send(statusMessages.badrequest);

  try {
    const userExists = await userModel.findById(currentUser).exec();
    if (!userExists) {
      console.error(controllerError(logoutController.name, "line_24"));
      return res.status(500).send(statusMessages.internalerror);
    }

    const delRefreshToken = await tokenModel
      .findByIdAndDelete(userExists._id)
      .exec();
    if (!delRefreshToken) {
      console.error(controllerError(logoutController.name, "line_32"));
      return res.status(500).send(statusMessages.internalerror);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res
      .status(200)
      .send(controllerMessages.user.logout.logoutSuccessful);
  } catch (error) {
    console.error(controllerError(logoutController.name, "line_41", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default logoutController;
