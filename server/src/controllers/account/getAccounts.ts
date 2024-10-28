import statusCodes from "@/shared/statusCodes";
import { AccountProps, IdentifierProps } from "@/shared/types";
import { Request, Response } from "express";

import accountModel from "@/models/accountModel";

import { errorMessage } from "@/localization/i18n";

const getAccountsController = async (req: Request, res: Response) => {
  try {
    const { currentUser }: IdentifierProps = req.body;

    const accounts: AccountProps[] = await accountModel.find({ belongsToUser: currentUser }).exec();
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
    console.error(errorMessage(getAccountsController.name, "line_28", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default getAccountsController;
