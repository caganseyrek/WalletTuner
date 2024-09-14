import statusCodes from "@/shared/statusCodes";
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import mongoose from "mongoose";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const registerController = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(statusCodes.badRequest).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const existingUser = await userModel.find({ email: email }).exec();
    if (existingUser.length > 0) {
      return res.status(statusCodes.conflict).json({
        isSuccess: false,
        message: userMessages.register.userExists,
        data: null,
      });
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const newUser = new userModel({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      preferredCurrency: "USD",
      preferredCurrencyDisplayType: "symbol",
      preferredCurrencyDisplayPosition: "left",
      preferredCurrencyDisplaySpacing: "nbsp",
      preferredCurrencyThousandSeperator: "comma",
      preferredCurrencyDecimalSeperator: "dot",
    });

    const saveNewUser = await newUser.save();
    if (!saveNewUser) {
      console.error(errorMessage(registerController.name, "line_49"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    return res.status(statusCodes.created).json({
      isSuccess: true,
      message: userMessages.register.registerSuccessful,
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(registerController.name, "line_63", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default registerController;
