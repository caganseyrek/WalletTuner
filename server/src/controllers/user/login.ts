import { FRONTENTD_URL } from "../../../server";
import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";

import tokenModel from "../../models/tokenModel";
import userModel from "../../models/userModel";

import { errorMessage, statusMessages, userMessages } from "../../localization/messages.en";

const loginController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send(statusMessages.badrequest);

    const userExists = await userModel.findOne({ email: email }).exec();
    if (!userExists) return res.status(409).send(userMessages.login.wrongEmailOrPassword);

    const passwordMatch = await compare(password, userExists.password as string);
    if (!passwordMatch) return res.status(401).send(userMessages.login.wrongEmailOrPassword);

    const existingRefreshTokens = await tokenModel.find({ belongsTo: userExists._id }).exec();
    if (existingRefreshTokens.length >= 1) {
      existingRefreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch (error) {
          console.error(errorMessage(loginController.name, "line_29"));
        }
      });
    }

    const refreshToken = sign(
      { data: (userExists._id as string) + new Date().toISOString() },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "1 day" /* 1day */ },
    );
    const accessToken = sign(
      { data: (userExists._id as string) + new Date().toISOString() },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15min" /* 15min */ },
    );

    const newToken = new tokenModel({
      _id: new mongoose.Types.ObjectId(),
      refreshToken: refreshToken,
      belongsTo: userExists._id as string,
    });
    const saved = await newToken.save();
    if (!saved) {
      console.error(errorMessage(loginController.name, "line_52"));
      return res.status(500).send(statusMessages.internalerror);
    }

    res.cookie("refreshToken", refreshToken, {
      domain: FRONTENTD_URL,
      httpOnly: true,
      // secure: true,
      maxAge: 60000 * 60 * 24 * 1, // 1 day
      // sameSite: "strict",
      signed: true,
    });

    return res.status(200).send({
      message: userMessages.login.loginSuccessful,
      accessToken: accessToken,
      currentUser: userExists._id as string,
      name: userExists.name as string,
    });
  } catch (error) {
    console.error(errorMessage(loginController.name, "line_73", error));
    return res.status(500).send(statusMessages.badrequest);
  }
};

export default loginController;
