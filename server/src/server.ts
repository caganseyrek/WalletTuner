import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import i18next from "i18next";
// import { handle as i18nextMiddlewareHandler } from "i18next-http-middleware";
import mongoose from "mongoose";
import morgan from "morgan";

import env from "./utils/envHelper";
import AppError from "./utils/errorHandler";
import HELMET_OPTIONS from "./utils/helmetOptions";
import logger from "./utils/logger";
import ResponseHelper from "./utils/responseHelper";
import TranslationHelper from "./utils/translationHelper";
import statusCodes from "@/utils/statusCodes";

import errorHandlerMiddleware from "./middleware/error";

import accountRoutes from "./routes/accountRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

// This project is NOT tested for production environments

const app: express.Application = express();

mongoose.connect(env.DATABASE.URI_START + env.DATABASE.URI_END);
mongoose.connection.on("error", (error) => logger.error(`Something went wrong with the database connection: ${error}`));
mongoose.connection.once("open", () => logger.info("Successfully connected to the database."));

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 min
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: () => {
    throw new AppError({
      statusCode: statusCodes.tooManyRequests,
      message: "Rate limit exceeded",
    });
  },
});

app.use(rateLimiter);
app.use(helmet(HELMET_OPTIONS));
app.use(morgan("dev"));
app.use(cookieParser(env.SECRETS.COOKIE));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(i18nextMiddlewareHandler(i18next));

logger.info(`i18next init?: ${i18next.isInitialized}`);

app.use("/api/account", accountRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandlerMiddleware);

app.get("/api/ping", (_req: Request, res: Response) => {
  return res.status(statusCodes.notFound).json(
    ResponseHelper.generateResponse({
      isSuccess: true,
      message: "pong",
      data: null,
    }),
  );
});

app.use((req: Request, res: Response) => {
  return res.status(statusCodes.notFound).json(
    ResponseHelper.generateResponse({
      isSuccess: false,
      message: TranslationHelper.translate(req, "statusMessages.notFound"),
      data: null,
    }),
  );
});

app.use((error: Error, req: Request, res: Response) => {
  logger.error(`An error ocurred: ${error}`);
  return res.status(statusCodes.internalServerError).json(
    ResponseHelper.generateResponse({
      isSuccess: false,
      message: TranslationHelper.translate(req, "statusMessages.internalError"),
      data: null,
    }),
  );
});

const server = app.listen(env.SERVER_PORT, () => {
  logger.info(`Server started at port ${env.SERVER_PORT}`);
});

process.on("SIGTERM", () => {
  try {
    server.close();
    mongoose.disconnect();
  } catch (error) {
    logger.error(`An error ocurred while shutting down the server: ${error}`);
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  try {
    server.close();
    mongoose.disconnect();
  } catch (error) {
    logger.error(`An error ocurred while shutting down the server: ${error}`);
    process.exit(1);
  }
});
