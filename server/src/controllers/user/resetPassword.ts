import { compare, genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const resetPasswordController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser, oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword || oldpassword !== newpassword)
      return res.status(400).send(statusMessages.badrequest);

    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(400).send(statusMessages.badrequest);

    const savedOldPassword = await userModel.find(currentUser).exec();
    const oldPasswordValidate = await compare(oldpassword, savedOldPassword[0].password as string);
    if (!oldPasswordValidate)
      return res.status(401).send(userMessages.resetpw.passwordValidationFail);

    const salt = await genSalt();
    const newHashedPassword = await hash(newpassword, salt);
    const passwordUpdated = await userModel
      .findByIdAndUpdate(currentUser, { password: newHashedPassword })
      .exec();
    if (!passwordUpdated) {
      console.error(errorMessage(resetPasswordController.name, "line_28"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(200).send(userMessages.resetpw.resetpwSuccessful);
  } catch (error) {
    console.error(errorMessage(resetPasswordController.name, "line_34", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default resetPasswordController;
