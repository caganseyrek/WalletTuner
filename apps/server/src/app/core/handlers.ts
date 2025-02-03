import express, { NextFunction, Request, Response } from "express";

import logger from "@/utils/logger";

import ResponseHelper from "@/app/response";
import STATUS_CODES from "@/constants/statusCodes";

/**
 * Class for handling global middlewares for the Express application.
 * This class manages error handling by providing middleware for 404 and 500 responses.
 */
class Handlers {
  /**
   * Applies global middlewares to handle '404 Not Found' and general error responses.
   *
   * - The first middleware catches all unmatched routes and returns a 404 response.
   * - The second middleware handles errors, logs them, and returns a 500 response.
   *
   * @param {express.Application} app - The Express application instance.
   * @returns {express.Application} The modified Express application with the said middlewares applied.
   */
  public static apply(app: express.Application): express.Application {
    app.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(STATUS_CODES.notFound.code).json(
        ResponseHelper.response({
          isSuccess: false,
          responseMessage: STATUS_CODES.notFound.message,
          data: null,
        }),
      );
    });

    app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
      logger.error(`An error ocurred: ${error}`);
      res.status(STATUS_CODES.internalServerError.code).json(
        ResponseHelper.response({
          isSuccess: false,
          responseMessage: STATUS_CODES.internalServerError.message,
          data: null,
        }),
      );
    });
    return app;
  }
}

export default Handlers;
