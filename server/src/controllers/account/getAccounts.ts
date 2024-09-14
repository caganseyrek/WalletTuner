import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const getAccountsController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const accounts = await accountModel.find({ belongsToUser: currentUser }).exec();
    if (!accounts) {
      return res.status(statusCodes.notFound).json({
        isSuccess: false,
        message: accountMessages.getAccounts.noAccountsFound,
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: accounts,
    });
  } catch (error) {
    console.error(errorMessage(getAccountsController.name, "line_27", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default getAccountsController;
