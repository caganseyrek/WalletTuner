import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { accountMessages, errorMessage, statusMessages } from "@/localization/messages.en";

const getAccountsByFilterController = async (req: Request, res: Response) => {
  try {
    const { currentUser, accountId } = req.body;

    const filters = {
      _id: accountId,
      belongsToUser: currentUser,
    };

    const accounts = await accountModel.find(filters).exec();
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
    console.error(errorMessage(getAccountsByFilterController.name, "line_32", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: statusMessages.internalerror,
      data: null,
    });
  }
};

export default getAccountsByFilterController;
