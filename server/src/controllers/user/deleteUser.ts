import statusCodes from "@/shared/statusCodes";
import { compare } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { currentUser, password } = req.body;

    const userDetails = await userModel.findById(currentUser).exec();
    if (!userDetails) {
      console.error(errorMessage(deleteUserController.name, "line_15"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    const validatePassword = await compare(password, userDetails.password as string);
    if (!validatePassword) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("user.error.passwordValidationFail"),
        data: null,
      });
    }
    const userDeleted = await userModel.findByIdAndDelete(currentUser).exec();
    if (!userDeleted) {
      console.error(errorMessage(deleteUserController.name, "line_33"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("user.success.deleteSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(deleteUserController.name, "line_47", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default deleteUserController;
