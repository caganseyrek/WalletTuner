import { NextFunction, Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, middlewareMessages, statusMessages } from "@/localization/messages.en";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { currentUser } = req.body;
  if (currentUser) {
    try {
      const validateUserId = await userModel.findById(currentUser);
      if (validateUserId) return next();
      return res.status(400).send(middlewareMessages.validateUser.invalidUserId);
    } catch (error) {
      console.error(errorMessage("validateUser", "line_15", error, true));
      return res.status(400).send(statusMessages.badrequest);
    }
  }
  return res.status(400).send(statusMessages.badrequest);
};
