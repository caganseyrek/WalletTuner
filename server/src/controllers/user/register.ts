import statusCodes from "@/shared/statusCodes";
import { RegisterProps, UserProps } from "@/shared/types";
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import mongoose from "mongoose";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const registerController = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password }: RegisterProps = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const existingUser: UserProps[] = await userModel.find({ email: email }).exec();
    if (existingUser.length > 0) {
      return res.status(statusCodes.conflict).json({
        isSuccess: false,
        message: req.t("user.error.userExists"),
        data: null,
      });
    }

    const salt: string = await genSalt();
    const hashedPassword: string = await hash(password, salt);

    const newUser = new userModel<UserProps>({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      preferredFormat: "en-US",
      preferredCurrency: "USD",
      preferredCurrencyDisplay: "narrowSymbol",
    });

    const saveNewUser = await newUser.save();
    if (!saveNewUser) {
      console.error(errorMessage(registerController.name, "line_47"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.created).json({
      isSuccess: true,
      message: req.t("user.success.registerSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(registerController.name, "line_61", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default registerController;
