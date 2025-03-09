import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import HELMET_OPTIONS from "@/app/constant/helmetOptions";

import config from "../config";
import { RateLimitError } from "../error/errors";
import errorHandler from "../middleware/errorHandler";
import requestSanitizer from "../middleware/requestSanitizer";

class Middlewares {
  private rateLimiter: RateLimitRequestHandler;

  constructor() {
    this.rateLimiter = rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minute window
      limit: 20, // maximum 100 requests per window
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler: () => {
        throw new RateLimitError();
      },
    });
  }

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
    app.use(errorHandler);
    app.use(requestSanitizer);
    app.use(this.rateLimiter);
    app.use(helmet(HELMET_OPTIONS));
    app.use(morgan("dev"));
    app.use(cookieParser(config.SECRETS.COOKIE));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    return app;
  }
}

export default Middlewares;
