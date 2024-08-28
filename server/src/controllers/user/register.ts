import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import mongoose from "mongoose";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const registerController = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(400).send(statusMessages.badrequest);
    }

    const existingUser = await userModel.find({ email: email }).exec();
    if (existingUser.length > 0) {
      return res.status(409).send(userMessages.register.userExists);
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
      console.error(errorMessage(registerController.name, "line_40"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(201).send(userMessages.register.registerSuccessful);
  } catch (error) {
    console.error(errorMessage(registerController.name, "line_46", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default registerController;
