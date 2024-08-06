import { NextFunction, Request, Response } from "express";

import tokenModel from "../../models/tokenModel";

import {
  controllerError,
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
    const hasValidRefreshToken = await tokenModel
      .findOne({ belongsTo: currentUser })
      .exec();
    if (hasValidRefreshToken) return res.status(405).send();
  } catch (error) {
    console.error(controllerError(newTokenController.name, "line_FF", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default newTokenController;
