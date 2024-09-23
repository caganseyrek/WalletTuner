import statusCodes from "@/shared/statusCodes";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { currentUser, oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword || oldpassword !== newpassword) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const savedOldPassword = await userModel.find(currentUser).exec();
    const oldPasswordValidate = await compare(oldpassword, savedOldPassword[0].password as string);
    if (!oldPasswordValidate) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("user.error.passwordValidationFail"),
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
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("user.success.resetpwSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(resetPasswordController.name, "line_59", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default resetPasswordController;
