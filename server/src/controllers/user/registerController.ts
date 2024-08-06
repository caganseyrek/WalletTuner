import { genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import userModel from "../../models/userModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const registerController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { name, surname, email, password } = req.body;
  if (!name || !surname || !email || !password)
    return res.status(400).send(statusMessages.badrequest);

  try {
    const userExists = await userModel.find({ email: email }).exec();
    if (userExists)
      return res.status(409).send(controllerMessages.user.register.userExists);

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const newUser = new userModel({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    });

    const saved = await newUser.save();
    if (!saved) {
      console.error(controllerError(registerController.name, "line_42"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res
      .status(201)
      .send(controllerMessages.user.register.registerSuccessful);
  } catch (error) {
    console.error(controllerError(registerController.name, "line_50", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default registerController;
