import statusCodes from "@/shared/statusCodes";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { currentUser, oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword || oldpassword !== newpassword) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const savedOldPassword = await userModel.find(currentUser).exec();
    const oldPasswordValidate = await compare(oldpassword, savedOldPassword[0].password as string);
    if (!oldPasswordValidate) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: userMessages.resetpw.passwordValidationFail,
        data: null,
      });
    }

    const salt = await genSalt();
    const newHashedPassword = await hash(newpassword, salt);
    const passwordUpdated = await userModel
      .findByIdAndUpdate(currentUser, { password: newHashedPassword })
      .exec();
    if (!passwordUpdated) {
      console.error(errorMessage(resetPasswordController.name, "line_45"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: userMessages.resetpw.resetpwSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(resetPasswordController.name, "line_59", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default resetPasswordController;
