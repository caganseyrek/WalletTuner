import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages } from "@/localization/messages.en";

const userDetailsController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const existingUser = await userModel.findById(currentUser).exec();
    const userDetails = {
      name: existingUser!.name,
      surname: existingUser!.surname,
      email: existingUser!.email,
    };

    return res.status(200).send(userDetails);
  } catch (error) {
    console.error(errorMessage(userDetailsController.name, "line_20", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default userDetailsController;
