import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { errorMessage } from "@/localization/i18n";

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
        message: req.t("account.error.noAccountsFound"),
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
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default getAccountsByFilterController;
