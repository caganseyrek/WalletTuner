import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import tokenModel from "../../models/tokenModel";

import {
  controllerError,
  controllerMessages,
  statusMessages,
} from "../../localization/messages_en";

const newTokenController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { user, currentUser } = req.body;
  if (!user) return res.status(401).send(statusMessages.unauthorized);
  if (!currentUser) return res.status(400).send(statusMessages.badrequest);

  try {
    const hasRefreshToken = await tokenModel
      .findOne({ belongsTo: currentUser })
      .exec();
    if (!hasRefreshToken)
      return res
        .status(405)
        .send(controllerMessages.token.newToken.noRefreshTokenFound);
    const isRefreshTokenValid = verify(
      hasRefreshToken.refreshToken as string,
      process.env.JWT_REFRESH_SECRET! as string,
    );
    if (!isRefreshTokenValid)
      return res
        .status(405)
        .send(controllerMessages.token.newToken.refreshTokenExpired);

    const newAccessToken = sign(currentUser, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    return res.status(201).send({ accessToken: newAccessToken });
  } catch (error) {
    console.error(controllerError(newTokenController.name, "line_FF", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default newTokenController;
