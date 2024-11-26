import { NextFunction, Request, Response } from "express";

import AppError from "@/utils/errorHandler";
import logger from "@/utils/logger";
import generateResponse from "@/utils/responseHandler";
import statusCodes from "@/utils/statusCodes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandlerMiddleware(error: Error, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(
      generateResponse({
        isSuccess: false,
        message: req.t(error.message),
        data: null,
      }),
    );
  } else {
    logger.error(`An unknown error occured: ${error}`);
    return res.status(statusCodes.internalServerError).json(
      generateResponse({
        isSuccess: false,
        message: req.t("statusMessages.internalError"),
        data: null,
      }),
    );
  }
}

export default errorHandlerMiddleware;
