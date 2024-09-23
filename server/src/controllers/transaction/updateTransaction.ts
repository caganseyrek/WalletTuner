import statusCodes from "@/shared/statusCodes";
import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const updateTransactionController = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const {
      currentUser,
      belongsToUser,
      belongsToAccount,
      transactionType,
      transactionDescription,
      transactionDateTime,
      transactionValue,
    } = req.body;
    if (belongsToUser) {
      return res.status(statusCodes.notFound).json({
        isSuccess: false,
        message: req.t("statusMessages.badrequest"),
        data: null,
      });
    }

    const update = await transactionModel
      .findByIdAndUpdate(transactionId, {
        belongsToAccount: belongsToAccount,
        belongsToUser: currentUser,
        transactionType: transactionType,
        transactionDescription: transactionDescription ?? "",
        transactionDateTime: transactionDateTime,
        transactionValue: transactionValue,
      })
      .exec();
    if (!update) {
      console.error(errorMessage(updateTransactionController.name, "line_39"));
      return res.status(statusCodes.internalServerError).json({
        isSuccess: false,
        message: req.t("statusMessages.internalerror"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: req.t("transaction.success.updateSuccessful"),
      data: null,
    });
  } catch (error) {
    console.error(errorMessage(updateTransactionController.name, "line_53", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default updateTransactionController;
