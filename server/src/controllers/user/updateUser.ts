import statusCodes from "@/shared/statusCodes";
import { UpdateUserProps, UserProps } from "@/shared/types";
import { compare } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { currentUser, password, name, surname, email }: UpdateUserProps = req.body;
    if (password) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const userDetails: UserProps = await userModel.findById(currentUser).exec();
    const passwordValidation: boolean = await compare(password, userDetails!.password);
    if (!passwordValidation) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("user.error.passwordValidationFail"),
        data: null,
      });
    }

    const update: UserProps = await userModel
      .findByIdAndUpdate(currentUser, {
        name: name,
        surname: surname,
        email: email,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateUserController.name, "line_39"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: false,
      message: req.t("user.success.updateSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(updateUserController.name, "line_53", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default updateUserController;
