import { compare } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { currentUser, password, name, surname, email } = req.body;
    if (password) {
      return res.status(400).send(statusMessages.badrequest);
    }

    const userDetails = await userModel.findById(currentUser).exec();
    const passwordValidation = await compare(password, userDetails!.password as string);
    if (!passwordValidation) {
      return res.status(401).send(userMessages.updateUser.passwordValidationFail);
    }

    const update = await userModel
      .findByIdAndUpdate(currentUser, {
        name: name,
        surname: surname,
        email: email,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateUserController.name, "line_29"));
      return res.status(500).send(userMessages.updateUser.updateFailed);
    }

    return res.status(200).send(userMessages.updateUser.updateSuccessful);
  } catch (error) {
    console.error(errorMessage(updateUserController.name, "line_35", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default updateUserController;
