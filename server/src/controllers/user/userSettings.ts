import { NextFunction, Request, Response } from "express";

import userModel from "@/models/userModel";

import { errorMessage, statusMessages } from "@/localization/messages.en";

const userSettingsController = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { currentUser } = req.body;

    const currentUserSettings = await userModel.findById(currentUser).exec();
    const userSettings = {
      preferredCurrency: currentUserSettings!.preferredCurrency,
      preferredCurrencyDisplayType: currentUserSettings!.preferredCurrencyDisplayType,
      preferredCurrencyDisplayPosition: currentUserSettings!.prefferedCurrencyDisplayPosition,
      preferredCurrencyDisplaySpacing: currentUserSettings!.prefferedCurrencyDisplaySpacing,
      preferredCurrencyThousandSeperator: currentUserSettings!.prefferedCurrencyThousandSeperator,
      preferredCurrencyDecimalSeperator: currentUserSettings!.prefferedCurrencyDecimalSeperator,
    };

    return res.status(200).send(userSettings);
  } catch (error) {
    console.error(errorMessage(userSettingsController.name, "line_20", error));
    return res.status(500).send(statusMessages.internalerror);
  }
};

export default userSettingsController;
