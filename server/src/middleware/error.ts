import { Request, Response } from "express";

import ResponseHelper from "@/helpers/responseHelper";

import AppError from "@/utils/appError";
import logger from "@/utils/logger";
import TranslationHelper from "@/utils/translationHelper";

import statusCodes from "@/variables/statusCodes";

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
