import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage } from "@/localization/i18n";

const userSettingsController = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req.body;

    const currentUserSettings = await userModel.findById(currentUser).exec();
    const userSettings = {
      preferredCurrency: currentUserSettings!.preferredCurrency,
      preferredCurrencyDisplayType: currentUserSettings!.preferredCurrencyDisplayType,
      preferredCurrencyDisplayPosition: currentUserSettings!.preferredCurrencyDisplayPosition,
      preferredCurrencyDisplaySpacing: currentUserSettings!.preferredCurrencyDisplaySpacing,
      preferredCurrencyThousandSeperator: currentUserSettings!.preferredCurrencyThousandSeperator,
      preferredCurrencyDecimalSeperator: currentUserSettings!.preferredCurrencyDecimalSeperator,
    };

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: userSettings,
    });
  } catch (error) {
    console.error(errorMessage(userSettingsController.name, "line_27", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default userSettingsController;
