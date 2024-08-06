import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";

import tokenModel from "../../models/tokenModel";
import userModel from "../../models/userModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const loginController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send(statusMessages.badrequest);

  try {
    const userExists = await userModel.find({ email: email }).exec();
    if (!userExists)
      return res
        .status(409)
        .send(controllerMessages.user.login.wrongEmailOrPassword);

    const passwordMatch = await compare(
      password,
      userExists[0].password as string,
    );
    if (!passwordMatch)
      return res
        .status(401)
        .send(controllerMessages.user.login.wrongEmailOrPassword);

    const refreshToken = sign(
      userExists[0]._id as string,
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "1d" },
    );
    const accessToken = sign(
      userExists[0]._id as string,
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" },
    );

    const newToken = new tokenModel({
      _id: new mongoose.Types.ObjectId(),
      refreshToken: refreshToken,
      belongsTo: userExists[0]._id as string,
    });
    const saved = await newToken.save();
    if (!saved) {
      console.error(controllerError(loginController.name, "line_58"));
      return res.status(500).send(statusMessages.internalerror);
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60000 * 60 * 24 * 1, // 1 day
      sameSite: "strict",
      signed: true,
    });

    return res.status(200).send({
      message: controllerMessages.user.login.loginSuccessful,
      accessToken: accessToken,
      currentUser: userExists[0]._id as string,
    });
  } catch (error) {
    console.error(controllerError(loginController.name, "line_76", error));
    return res.status(500).send(statusMessages.badrequest);
  }
};

export default loginController;
