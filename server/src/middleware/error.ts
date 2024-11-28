import { Request, Response } from "express";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import ResponseHelper from "@/utils/responseHelper";
import statusCodes from "@/utils/statusCodes";
import TranslationHelper from "@/utils/translationHelper";

function errorHandlerMiddleware(error: Error, req: Request, res: Response) {
  if (error instanceof AppError) {
    logger.error(`An AppError occured: ${error.stack}`);
    return res.status(error.statusCode).json(
      ResponseHelper.generateResponse({
        isSuccess: false,
        message: TranslationHelper.translate(req, error.message),
        data: null,
      }),
    );
  } else {
    logger.error(`An unknown error occured: ${error.stack}`);
    return res.status(statusCodes.internalServerError).json(
      ResponseHelper.generateResponse({
        isSuccess: false,
        message: TranslationHelper.translate(req, "statusMessages.internalError"),
        data: null,
      }),
    );
  }
}

export default errorHandlerMiddleware;
