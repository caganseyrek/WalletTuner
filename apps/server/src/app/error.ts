import { NextFunction, Request, Response } from "express";

import logger from "@/utils/logger";

import ResponseHelper from "./response";
import STATUS_CODES from "@/constants/statusCodes";

export interface AppErrorProps {
  statusCode: number;
  message: string;
}

export class AppError extends Error {
  statusCode: number;

  constructor({ statusCode, message }: AppErrorProps) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
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
