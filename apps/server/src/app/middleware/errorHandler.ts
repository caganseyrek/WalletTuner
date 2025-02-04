import { NextFunction, Request, Response } from "express";

import logger from "@/utils/logger";

import STATUS_CODES from "@/constants/statusCodes";

import { AppError } from "../error";
import ResponseHelper from "../response";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof AppError) {
    logger.error(`An AppError occured: ${error.stack}`);
    res.status(error.statusCode).json(
      ResponseHelper.response({
        isSuccess: false,
        responseMessage: error.message,
        data: null,
      }),
    );
  } else {
    logger.error(`An unknown error occured: ${error.stack}`);
    res.status(STATUS_CODES.internalServerError.code).json(
      ResponseHelper.response({
        isSuccess: false,
        responseMessage: "statusMessages.internalError",
        data: null,
      }),
    );
  }
};

export default errorHandler;
