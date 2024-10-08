import statusCodes from "@/shared/statusCodes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { Request, Response } from "express";
import helmet, { HelmetOptions } from "helmet";
import i18next from "i18next";
import { handle } from "i18next-http-middleware";
import mongoose from "mongoose";
import morgan from "morgan";

import { accountRoutes } from "@/routes/accountRoutes";
import { tokenRoutes } from "@/routes/tokenRoutes";
import { transactionRoutes } from "@/routes/transactionRoutes";
import { userRoutes } from "@/routes/userRoutes";

import { errorMessage } from "@/localization/i18n";

// This project is NOT tested for production environments

// Environment Variables
const PORT: string = process.env.PORT!;
const COOKIE_SECRET: string = process.env.COOKIE_SECRET!;
const DATABASE_URI_1: string = process.env.DATABASE_URI_1!;
const DATABASE_URI_2: string = process.env.DATABASE_URI_2!;

const IS_DEV: boolean = process.env.IS_DEV === "true" ? true : false;
export const FRONTENTD_URL: string = IS_DEV
  ? process.env.DEV_LOCALHOST!
  : process.env.FRONTEND_URL!;

// Database Connection
mongoose.connect(DATABASE_URI_1 + DATABASE_URI_2);
mongoose.connection.on("error", (error) =>
  console.error(`Something went wrong with the database connection: \n${error}`),
);
mongoose.connection.once("open", () => console.info("Successfully connected to the database."));

// Express app
const app: express.Application = express();

// Middlewares
const HELMET_OPTIONS: HelmetOptions = {
  xPoweredBy: false,
  crossOriginResourcePolicy: { policy: "same-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginEmbedderPolicy: { policy: "require-corp" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['"self"', `'${FRONTENTD_URL}'`],
      scriptSrc: ["'self'", `'${FRONTENTD_URL}'`],
      imgSrc: ["'self'", `'${FRONTENTD_URL}'`],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: "true",
      blockAllMixedContent: "true",
    },
  },
  hsts: {
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: { action: "deny" },
  dnsPrefetchControl: { allow: false },
  noSniff: true,
};
app.use(helmet(HELMET_OPTIONS));
app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(handle(i18next));

console.log(i18next.store.data);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transaction", transactionRoutes);

// Not found handler
app.use((req: Request, res: Response) => {
  return res.status(statusCodes.notFound).json({
    isSuccess: false,
    message: req.t("statusMessages.notfound"),
    data: null,
  });
});

// Error handler
app.use((error: Error, req: Request, res: Response) => {
  console.error(errorMessage("server.ts", "line_91", error));
  return res.status(statusCodes.internalServerError).json({
    isSuccess: false,
    message: req.t("statusMessages.internalerror"),
    data: null,
  });
});

// Start the express app
app.listen(PORT, () => {
  console.info(`Server started at port ${PORT}`);
});
