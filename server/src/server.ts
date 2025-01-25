import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";

import HELMET_OPTIONS from "./utils/constants/helmetOptions";
import STATUS_CODES from "./utils/constants/statusCodes";
import swaggerOptions from "./utils/constants/swaggerOptions";
import config from "./utils/helpers/configHelper";
import AppError from "./utils/helpers/errorHelper";
import ResponseHelper from "./utils/helpers/responseHelper";
import logger from "./utils/logger";

import errorHandlerMiddleware from "./middleware/error";

import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";

const app: express.Application = express();

mongoose.connect(config.DATABASE.URI_START + config.DATABASE.URI_END);
mongoose.connection.on("error", (error) => logger.error(`Something went wrong with the database connection: ${error}`));
mongoose.connection.once("open", () => logger.info("Successfully connected to the database."));

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 min
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: () => {
    throw new AppError({
      statusCode: STATUS_CODES.tooManyRequests.code,
      message: STATUS_CODES.tooManyRequests.message,
    });
  },
});

app.use(rateLimiter);
app.use(helmet(HELMET_OPTIONS));
app.use(morgan("dev"));
app.use(cookieParser(config.SECRETS.COOKIE));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transaction", transactionRoutes);

app.use(errorHandlerMiddleware);

app.use(
  "/api/dev/swagger",
  swaggerUI.serve,
  swaggerUI.setup(swaggerOptions, {
    explorer: true,
    
  }),
);

app.use((_req: Request, res: Response) => {
  return res.status(STATUS_CODES.notFound.code).json(
    ResponseHelper.generate({
      isSuccess: false,
      message: STATUS_CODES.notFound.message,
      data: null,
    }),
  );
});

app.use((error: Error, _req: Request, res: Response) => {
  logger.error(`An error ocurred: ${error}`);
  return res.status(STATUS_CODES.internalServerError.code).json(
    ResponseHelper.generate({
      isSuccess: false,
      message: STATUS_CODES.internalServerError.message,
      data: null,
    }),
  );
});

const server = app.listen(config.SERVER_PORT, () => {
  logger.info(`Server started at port ${config.SERVER_PORT}`);
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
