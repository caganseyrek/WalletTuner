import { AppErrorParams } from "@/types/global";
import { ResponseParameters } from "@/types/utils";

export enum statusCodes {
  success = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  conflict = 409,
  tooManyRequests = 429,
  internalServerError = 500,
}

export class AppError extends Error {
  statusCode: statusCodes;

  constructor({ statusCode, message }: AppErrorParams) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ResponseHelper {
  static generateResponse({ isSuccess, message, data }: ResponseParameters) {
    return {
      isSuccess: isSuccess,
      message: message,
      data: data,
    };
  }
}
