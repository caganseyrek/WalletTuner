import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import tokenModel from "@/models/tokenModel";

import { errorMessage, statusMessages, tokenMessages } from "@/localization/messages.en";

const newTokenController = async (req: Request, res: Response) => {
  try {
    const { currentUser, refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).send(tokenMessages.noRefreshTokenReceived);
    }

    const isRefreshTokenExpired = verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    if (!isRefreshTokenExpired) {
      return res.status(401).send(tokenMessages.refreshTokenExpired);
    }

    const filters = {
      refreshToken: refreshToken,
      belongsTo: currentUser,
    };

    const hasRefreshToken = await tokenModel.findOne(filters).exec();
    if (!hasRefreshToken) {
      return res.status(405).send(tokenMessages.noRefreshTokenFound);
    }

    const isRefreshTokenValid = verify(
      hasRefreshToken.refreshToken as string,
      process.env.JWT_REFRESH_SECRET! as string,
    );

    if (!isRefreshTokenValid) {
      return res.status(405).send(tokenMessages.refreshTokenExpired);
    }
    if (hasRefreshToken.refreshToken !== refreshToken) {
      return res.status(401).send(tokenMessages.invalidRefreshToken);
    }

    const newAccessToken = sign(currentUser, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    return res.status(200).send({ accessToken: newAccessToken });
  } catch (error) {
    console.error(errorMessage(newTokenController.name, "line_46", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default newTokenController;
