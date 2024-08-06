import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";

import userModel from "../../models/userModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const updateController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { user, currentUser, password, name, surname, email } = req.body;
  if (!user) return res.status(401).send(statusMessages.unauthorized);
  if (password) return res.status(400).send(statusMessages.badrequest);

  try {
    const userDetails = await userModel.findById(currentUser).exec();
    if (!userDetails) {
      controllerError(updateController.name, "line_24");
      return res.status(500).send(statusMessages.internalerror);
    }

    const passwordValidation = await compare(
      password,
      userDetails.password as string,
    );
    if (!passwordValidation)
      return res
        .status(401)
        .send(controllerMessages.user.updateUser.passwordValidationFail);

    const updated = await userModel
      .findByIdAndUpdate(currentUser, {
        name: name,
        surname: surname,
        email: email,
      })
      .exec();
    if (!updated) {
      console.error(controllerError(updateController.name, "line_29"));
      return res
        .status(500)
        .send(controllerMessages.user.updateUser.updateFailed);
    }

    return res
      .status(200)
      .send(controllerMessages.user.updateUser.updateSuccessful);
  } catch (error) {
    console.error(controllerError(updateController.name, "line_31", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default updateController;
