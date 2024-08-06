import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet, { HelmetOptions } from "helmet";
import mongoose from "mongoose";
import "dotenv/config";

import { userRoutes } from "./src/routes/userRoutes";

// This project is just an example and should not use in production

// Environment Variables
const PORT: string = process.env.PORT!;
const DATABASE_URI: string = process.env.DATABASE_URI!;
const COOKIE_SECRET: string = process.env.COOKIE_SECRET!;

const IS_DEV: boolean = process.env.IS_DEV === "true" ? true : false;
const FRONTENTD_URL: string = IS_DEV
  ? process.env.DEV_LOCALHOST!
  : process.env.FRONTEND_URL!;

// Database Connection
mongoose.connect(DATABASE_URI);
mongoose.connection.on("error", (error) =>
  console.log(`Something went wrong with the database connection: \n${error}`)
);
mongoose.connection.once("open", () =>
  console.log("Successfully connected to the database.")
);

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
      defaultSrc: ['"self"'],
      scriptSrc: ["'self'", FRONTENTD_URL],
      imgSrc: ["'self'", FRONTENTD_URL],
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

// Routes
app.use("/api/user", userRoutes);

// Not found handler
app.use((_req: Request, res: Response) => {
  return res.status(404).send({ message: "Not found" });
});

// Error handler
app.use((error: Error, _req: Request, res: Response) => {
  console.error(`An error occurred: ${error}`);
  return res.status(500);
});

// Start the express app
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
