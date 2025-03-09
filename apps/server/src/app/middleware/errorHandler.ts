import { NextFunction, Request, Response } from "express";

import logger from "@/utils/logger";

import ResponseHelper from "../../helpers/responseHelper";

import STATUS_CODES from "@/constants/statusCodes";

import { AppError } from "../error/errors";

/**
 * Global error-handling middleware for Express applications.
 *
 * - Logs the error details.
 * - If the error is an instance of `AppError`, returns the corresponding status and message.
 * - Otherwise, returns a generic `500 Internal Server Error` response.
 *
 * @param {Error} error - The error that was thrown.
 * @param {Request} _req - The Express request object (not used).
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The next middleware function (not used, since this is the last handler).
 */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof AppError) {
    logger.error(`An AppError occured: ${error.message} - ${error.stack}`);
    res.status(error.statusCode).json(
      ResponseHelper.createResponse({
        isSuccess: false,
        responseMessage: error.message,
        data: null,
      }),
    );
  } else {
    logger.error(`An unknown error occured: ${error.message} - ${error.stack}`);
    res.status(STATUS_CODES.internalServerError.code).json(
      ResponseHelper.createResponse({
        isSuccess: false,
        responseMessage: STATUS_CODES.internalServerError.message,
        data: null,
      }),
    );
  }
};

export default errorHandler;
