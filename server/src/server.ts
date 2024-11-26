import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { IncomingMessage, Server, ServerResponse } from "http";
import i18next from "i18next";
import { handle } from "i18next-http-middleware";
import morgan from "morgan";

import HELMET_OPTIONS from "./utils/helmetOptions";
import logger from "./utils/logger";
import generateResponse from "./utils/responseHandler";
import statusCodes from "@/utils/statusCodes";

import DbConnection from "./config/database";
import env from "./config/env";

import errorHandlerMiddleware from "./middleware/error";
import loggerMiddleware from "./middleware/log";

import accountRoutes from "./routes/accountRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

// This project is NOT tested for production environments

const app: express.Application = express();

app.use(helmet(HELMET_OPTIONS));
app.use(morgan("dev"));
app.use(cookieParser(env.SECRETS.COOKIE));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(handle(i18next));

app.use("/api/account", accountRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);

app.get("/ping", (_req: Request, res: Response) => {
  return res.status(statusCodes.notFound).json(
    generateResponse({
      isSuccess: true,
      message: "pong",
      data: null,
    }),
  );
});

app.use((req: Request, res: Response) => {
  return res.status(statusCodes.notFound).json(
    generateResponse({
      isSuccess: false,
      message: req.t("statusMessages.notFound"),
      data: null,
    }),
  );
});

app.use((error: Error, req: Request, res: Response) => {
  logger.error(`An error ocurred: ${error}`);
  return res.status(statusCodes.internalServerError).json(
    generateResponse({
      isSuccess: false,
      message: req.t("statusMessages.internalError"),
      data: null,
    }),
  );
});

const dbConnection = new DbConnection();

async function shutdownServer(server: Server<typeof IncomingMessage, typeof ServerResponse>): Promise<void> {
  logger.info("Shutting down the server...");
  try {
    dbConnection.disconnect();
    server.close();
    process.exit(0);
  } catch (error) {
    logger.error(`An error ocurred while shutting down the server: ${error}`);
    process.exit(1);
  }
}

async function startServer(): Promise<void> {
  logger.info("Starting the server...");
  try {
    dbConnection.connect();
    const server = app.listen(env.SERVER_PORT, () => {
      logger.info(`Server started at port ${env.SERVER_PORT}`);
    });

    process.on("SIGINT", () => shutdownServer(server));
    process.on("SIGTERM", () => shutdownServer(server));
  } catch (error) {
    logger.error(`An error ocurred while starting the server: ${error}`);
    process.exit(1);
  }
}

startServer();
