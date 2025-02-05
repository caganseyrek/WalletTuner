import STATUS_CODES from "@/constants/statusCodes";

interface AppErrorProps {
  statusCode: number;
  message: string;
}

/**
 * Base class for custom application errors.
 */
export class AppError extends Error {
  statusCode: number;

  /**
   * Creates a new application error instance.
   *
   * @param {AppErrorProps} params - Error properties.
   * @param {number} params.statusCode - HTTP status code for the error.
   * @param {string} params.message - Descriptive error message.
   */
  constructor({ statusCode, message }: AppErrorProps) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents a 400 Bad Request error.
 */
export class BadRequestError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.badRequest.code,
      message: STATUS_CODES.badRequest.message,
    });
  }
}

/**
 * Represents a 500 Internal Server Error.
 */
export class InternalError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.internalServerError.code,
      message: STATUS_CODES.internalServerError.message,
    });
  }
}

/**
 * Represents a 404 Not Found error.
 */
export class NotFoundError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.notFound.code,
      message: STATUS_CODES.notFound.message,
    });
  }
}

/**
 * Represents a 401 Unauthorized error.
 */
export class UnauthorizedError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.unauthorized.code,
      message: STATUS_CODES.unauthorized.message,
    });
  }
}

/**
 * Represents a 429 Too Many Requests error (Rate Limiting).
 */
export class RateLimitError extends AppError {
  constructor() {
    super({
      statusCode: STATUS_CODES.tooManyRequests.code,
      message: STATUS_CODES.tooManyRequests.message,
    });
  }
}
