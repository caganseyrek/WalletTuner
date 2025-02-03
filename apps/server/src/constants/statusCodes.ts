interface StatusCodeProps {
  [key: string]: {
    code: number;
    message: string;
  };
}

const STATUS_CODES: StatusCodeProps = {
  success: {
    code: 200,
    message: "OK",
  },
  created: {
    code: 201,
    message: "Resource created successfully",
  },
  accepted: {
    code: 202,
    message: "Request accepted for processing",
  },
  noContent: {
    code: 204,
    message: "No content to return",
  },
  badRequest: {
    code: 400,
    message: "Bad request",
  },
  unauthorized: {
    code: 401,
    message: "Unauthorized access",
  },
  paymentRequired: {
    code: 402,
    message: "Payment required",
  },
  forbidden: {
    code: 403,
    message: "Access forbidden",
  },
  notFound: {
    code: 404,
    message: "Resource not found",
  },
  methodNotAllowed: {
    code: 405,
    message: "Method not allowed",
  },
  notAcceptable: {
    code: 406,
    message: "Request not acceptable",
  },
  requestTimeout: {
    code: 408,
    message: "Request timed out",
  },
  conflict: {
    code: 409,
    message: "Conflict with the current state of the resource",
  },
  gone: {
    code: 410,
    message: "Resource is no longer available",
  },
  lengthRequired: {
    code: 411,
    message: "Content-Length header is required",
  },
  preconditionFailed: {
    code: 412,
    message: "Precondition failed",
  },
  payloadTooLarge: {
    code: 413,
    message: "Payload is too large",
  },
  uriTooLong: {
    code: 414,
    message: "URI is too long",
  },
  unsupportedMediaType: {
    code: 415,
    message: "Unsupported media type",
  },
  rangeNotSatisfiable: {
    code: 416,
    message: "Range not satisfiable",
  },
  expectationFailed: {
    code: 417,
    message: "Expectation failed",
  },
  imATeapot: {
    code: 418,
    message: "I'm a teapot",
  },
  tooManyRequests: {
    code: 429,
    message: "Too many requests, try again later",
  },
  internalServerError: {
    code: 500,
    message: "Internal server error",
  },
  notImplemented: {
    code: 501,
    message: "Not implemented",
  },
  badGateway: {
    code: 502,
    message: "Bad gateway",
  },
  serviceUnavailable: {
    code: 503,
    message: "Service unavailable",
  },
  gatewayTimeout: {
    code: 504,
    message: "Gateway timeout",
  },
  httpVersionNotSupported: {
    code: 505,
    message: "HTTP version not supported",
  },
};

export default STATUS_CODES;
