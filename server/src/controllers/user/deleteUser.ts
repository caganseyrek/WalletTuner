import { compare } from "bcrypt";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages, userMessages } from "@/localization/messages.en";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { currentUser, password } = req.body;

    const userDetails = await userModel.findById(currentUser).exec();
    if (!userDetails) {
      console.error(errorMessage(deleteUserController.name, "line_14"));
      return res.status(500).send(statusMessages.internalerror);
    }

    const validatePassword = await compare(password, userDetails.password as string);
    if (!validatePassword) {
      return res.status(401).send(userMessages.deleteUser.passwordValidationFail);
    }
    const userDeleted = await userModel.findByIdAndDelete(currentUser).exec();
    if (!userDeleted) {
      console.error(errorMessage(deleteUserController.name, "line_24"));
      return res.status(500).send(statusMessages.internalerror);
    }

    return res.status(200).send(userMessages.deleteUser.deleteSuccessful);
  } catch (error) {
    console.error(errorMessage(deleteUserController.name, "line_30", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default deleteUserController;
