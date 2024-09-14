import { FRONTENTD_URL } from "../../../server";
import statusCodes from "@/shared/statusCodes";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";

import tokenModel from "@/models/tokenModel";
import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(statusCodes.conflict).json({
        isSuccess: false,
        message: statusMessages.badrequest,
        data: null,
      });
    }

    const userExists = await userModel.findOne({ email: email }).exec();
    if (!userExists) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: userMessages.login.wrongEmailOrPassword,
        data: null,
      });
    }

    const passwordMatch = await compare(password, userExists.password as string);
    if (!passwordMatch) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: userMessages.login.wrongEmailOrPassword,
        data: null,
      });
    }

    const existingRefreshTokens = await tokenModel.find({ belongsTo: userExists._id }).exec();
    if (existingRefreshTokens.length >= 1) {
      existingRefreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch {
          console.error(errorMessage(loginController.name, "line_48"));
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
      console.error(errorMessage(loginController.name, "line_71"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: statusMessages.internalerror,
        data: null,
      });
    }

    res.cookie("refreshToken", refreshToken, {
      domain: FRONTENTD_URL,
      httpOnly: true,
      // secure: true,
      maxAge: 60000 * 60 * 24 * 1, // 1 day
      // sameSite: "strict",
      signed: true,
    });

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: userMessages.login.loginSuccessful,
      data: {
        accessToken: accessToken,
        currentUser: userExists._id as string,
        name: userExists.name as string,
      },
    });
  } catch (error) {
    console.error(errorMessage(loginController.name, "line_98", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.badrequest,
      data: null,
    });
  }
};

export default loginController;
