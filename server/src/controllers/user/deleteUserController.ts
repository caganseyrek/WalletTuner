import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";

import tokenModel from "../../models/tokenModel";
import userModel from "../../models/userModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const deleteUserController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { user, currentUser, password } = req.body;
  if (!user) return res.status(401).send(statusMessages.unauthorized);

  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).send(statusMessages.badrequest);

    const hasValidToken = await tokenModel
      .find({ refreshToken: refreshToken })
      .exec();
    if (!hasValidToken)
      return res.status(401).send(statusMessages.unauthorized);

    const userDetails = await userModel.findById(currentUser).exec();
    if (!userDetails) {
      console.error(controllerError(deleteUserController.name, "line_34"));
      return res.status(500).send(statusMessages.internalerror);
    }

    const validatePassword = await compare(
      password,
      userDetails.password as string,
    );
    if (!validatePassword)
      return res
        .status(401)
        .send(controllerMessages.user.deleteUser.passwordValidationFail);

    const userDeleted = await userModel.findByIdAndDelete(currentUser).exec();
    if (!userDeleted) {
      console.error(controllerError(deleteUserController.name, "line_51"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res
      .status(200)
      .send(controllerMessages.user.deleteUser.deleteSuccessful);
  } catch (error) {
    console.error(controllerError(deleteUserController.name, "line_60", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default deleteUserController;
