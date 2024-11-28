import { AppErrorParams } from "@/types/global";

import statusCodes from "./statusCodes";

class AppError extends Error {
  statusCode: statusCodes;

  constructor({ statusCode, message }: AppErrorParams) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
