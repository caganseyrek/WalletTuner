import { NextFunction, Request, Response } from "express";

import STATUS_CODES from "@/utils/constants/statusCodes";
import AppError from "@/utils/helpers/errorHelper";
import ResponseHelper from "@/utils/helpers/responseHelper";
import logger from "@/utils/logger";

function errorHandlerMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    logger.error(`An AppError occured: ${error.stack}`);
    return res.status(error.statusCode).json(
      ResponseHelper.generate({
        isSuccess: false,
        message: error.message,
        data: null,
      }),
    );
  } else {
    logger.error(`An unknown error occured: ${error.stack}`);
    return res.status(STATUS_CODES.internalServerError.code).json(
      ResponseHelper.generate({
        isSuccess: false,
        message: "statusMessages.internalError",
        data: null,
      }),
    );
  }
}

export default errorHandlerMiddleware;
