import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const userDetailsController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const existingUser = await userModel.findById(currentUser).exec();
    const userDetails = {
      name: existingUser!.name,
      surname: existingUser!.surname,
      email: existingUser!.email,
    };

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: userDetails,
    });
  } catch (error) {
    console.error(errorMessage(userDetailsController.name, "line_24", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default userDetailsController;
