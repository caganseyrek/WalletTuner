import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import HELMET_OPTIONS from "@/app/constants/helmetOptions";

import config from "../config";
import ErrorHandler from "../errors/errorHandler";
import { RateLimitError } from "../errors/errors";

class Middlewares {
  /**
   * Applies middlewares to the Express application for security, rate limiting, and logging.
   *
   * - Rate limiter to prevent excessive requests.
   * - Helmet middleware to set security headers.
   * - Morgan for request logging in 'dev' format.
   * - Cookie parser for handling cookies.
   * - Body parser for parsing URL-encoded and JSON request bodies.
   *
   * @param {express.Application} app - The Express application instance.
   * @returns {express.Application} The modified Express application with the applied middlewares.
   */
  public apply(app: express.Application): express.Application {
    const rateLimiter: RateLimitRequestHandler = rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minute window
      limit: 20, // maximum 100 requests per window
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler: () => {
        throw new RateLimitError();
      },
    });
    app.use(rateLimiter);
    app.use(helmet(HELMET_OPTIONS));
    app.use(morgan("dev"));
    app.use(cookieParser(config.SECRETS.COOKIE));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(ErrorHandler.handle);
    return app;
  }
}

export default Middlewares;
