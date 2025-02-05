import express from "express";
import mongoose from "mongoose";

import config from "./app/config";
import Handlers from "./app/core/handlers";
import HttpServer from "./app/core/httpServer";
import Middlewares from "./app/core/middlewares";
import Routes from "./app/core/routes";
import Swagger from "./app/swagger";

import logger from "./utils/logger";

let app: express.Application = express();

mongoose.connect(config.DATABASE_URI);
mongoose.connection.on("error", (error) => logger.error("Something went wrong with the database connection: " + error));
mongoose.connection.once("open", () => logger.info("Successfully connected to the database."));

app = Middlewares.apply(app);
app = Routes.apply(app);
app = Swagger.apply(app);
app = Handlers.apply(app);

HttpServer.start(app);
