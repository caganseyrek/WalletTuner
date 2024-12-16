enum statusCodes {
  success = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  conflict = 409,
  tooManyRequests = 429,
  internalServerError = 500,
}

export default statusCodes;
