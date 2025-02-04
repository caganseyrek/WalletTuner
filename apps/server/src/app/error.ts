import STATUS_CODES from "@/constants/statusCodes";

interface AppErrorProps {
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

export class BadRequestError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.badRequest.code,
      message: STATUS_CODES.badRequest.message,
    });
  }
}

export class InternalError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.internalServerError.code,
      message: STATUS_CODES.internalServerError.message,
    });
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.notFound.code,
      message: STATUS_CODES.notFound.message,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.unauthorized.code,
      message: STATUS_CODES.unauthorized.message,
    });
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.tooManyRequests.code,
      message: STATUS_CODES.tooManyRequests.message,
    });
  }
}
