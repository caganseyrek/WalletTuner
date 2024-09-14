import statusCodes from "@/shared/statusCodes";
import { compare } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { currentUser, password, name, surname, email } = req.body;
    if (password) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const userDetails = await userModel.findById(currentUser).exec();
    const passwordValidation = await compare(password, userDetails!.password as string);
    if (!passwordValidation) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: userMessages.updateUser.passwordValidationFail,
        data: null,
      });
    }

    const update = await userModel
      .findByIdAndUpdate(currentUser, {
        name: name,
        surname: surname,
        email: email,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateUserController.name, "line_38"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: userMessages.updateUser.updateFailed,
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: false,
      message: userMessages.updateUser.updateSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(updateUserController.name, "line_52", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default updateUserController;
