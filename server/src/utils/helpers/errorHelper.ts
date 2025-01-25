import { GlobalTypes } from "@/types/globals";

class AppError extends Error {
  statusCode: number;

  constructor({ statusCode, message }: GlobalTypes.AppErrorParams) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
