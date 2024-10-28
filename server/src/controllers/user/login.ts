import { FRONTENTD_URL } from "../../../server";
import statusCodes from "@/shared/statusCodes";
import { LoginProps, TokenProps, UserProps } from "@/shared/types";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";

import tokenModel from "@/models/tokenModel";
import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginProps = req.body;
    if (!email || !password) {
      return res.status(statusCodes.conflict).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const userExists: UserProps = await userModel.findOne({ email: email }).exec();
    if (!userExists) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("user.error.wrongEmailOrPassword"),
        data: null,
      });
    }

    const passwordMatch: boolean = await compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(statusCodes.unauthorized).json({
        isSuccess: false,
        message: req.t("user.error.wrongEmailOrPassword"),
        data: null,
      });
    }

    const existingRefreshTokens: TokenProps[] = await tokenModel
      .find({ belongsTo: userExists._id })
      .exec();
    if (existingRefreshTokens.length >= 1) {
      existingRefreshTokens.forEach(async (token) => {
        try {
          await tokenModel.findByIdAndDelete(token._id).exec();
        } catch {
          console.error(errorMessage(loginController.name, "line_51"));
        }
      });
    }

    const refreshToken = sign(
      { data: userExists._id + new Date().toISOString() },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "1 day" /* 1day */ },
    );
    const accessToken = sign(
      { data: userExists._id + new Date().toISOString() },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15min" /* 15min */ },
    );

    const newToken = new tokenModel<TokenProps>({
      _id: new mongoose.Types.ObjectId(),
      refreshToken: refreshToken,
      belongsTo: userExists._id,
    });
    const saved = await newToken.save();
    if (!saved) {
      console.error(errorMessage(loginController.name, "line_74"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
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
      message: req.t("user.success.loginSuccessful"),
      data: {
        accessToken: accessToken,
        currentUser: userExists._id,
        name: userExists.name,
      },
    });
  } catch (error) {
    console.error(errorMessage(loginController.name, "line_101", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.badrequest"),
      data: null,
    });
  }
};

export default loginController;
