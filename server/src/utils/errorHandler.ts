import { AppErrorParams } from "@/types/global";

import statusCodes from "./statusCodes";

class AppError extends Error {
  statusCode: statusCodes;

  constructor({ statusCode, messageKey }: AppErrorParams) {
    super(messageKey);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
