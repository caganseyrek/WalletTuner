import { compare, genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";

import tokenModel from "../../models/tokenModel";
import userModel from "../../models/userModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const resetpwController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { user, currentUser, oldpassword, newpassword } = req.body;
  if (!user) return res.status(401).send(statusMessages.unauthorized);
  if (!currentUser || !oldpassword || !newpassword)
    return res.status(400).send(statusMessages.badrequest);

  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).send(statusMessages.badrequest);

    const hasValidToken = await tokenModel
      .find({ refreshToken: refreshToken })
      .exec();
    if (!hasValidToken)
      return res
        .status(401)
        .send(controllerMessages.user.resetpw.expiredRefreshToken);

    const savedOldPassword = await userModel.find(currentUser).exec();
    const oldPasswordValidate = await compare(
      oldpassword,
      savedOldPassword[0].password as string,
    );
    if (!oldPasswordValidate)
      return res
        .status(401)
        .send(controllerMessages.user.resetpw.passwordValidationFail);

    const salt = await genSalt();
    const newHashedPassword = await hash(newpassword, salt);
    const passwordUpdated = await userModel
      .findByIdAndUpdate(currentUser, { password: newHashedPassword })
      .exec();
    if (!passwordUpdated) {
      console.error(controllerError(resetpwController.name, "line_51"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res
      .status(200)
      .send(controllerMessages.user.resetpw.resetpwSuccessful);
  } catch (error) {
    console.error(controllerError(resetpwController.name, "line_57", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default resetpwController;
