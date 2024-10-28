import statusCodes from "@/shared/statusCodes";
import { IdentifierProps, TransactionProps } from "@/shared/types";
import { Request, Response } from "express";

import transactionModel from "@/models/transactionModel";

import { errorMessage } from "@/localization/i18n";

const getTransactionsController = async (req: Request, res: Response) => {
  try {
    const { currentUser }: IdentifierProps = req.body;

    const transactions: TransactionProps[] = await transactionModel
      .find({ belongsToUser: currentUser })
      .exec();
    if (!transactions) {
      return res.status(statusCodes.notFound).json({
        isSuccess: false,
        message: req.t("transaction.error.noTransactionsFound"),
        data: null,
      });
    }

    return res.status(statusCodes.success).json({
      isSuccess: true,
      message: "",
      data: transactions,
    });
  } catch (error) {
    console.error(errorMessage(getTransactionsController.name, "line_29", error));
    return res.status(statusCodes.internalServerError).json({
      isSuccess: false,
      message: req.t("statusMessages.internalerror"),
      data: null,
    });
  }
};

export default getTransactionsController;
