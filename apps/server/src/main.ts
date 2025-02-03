import express from "express";

import Database from "./app/core/database";
import Handlers from "./app/core/handlers";
import HttpServer from "./app/core/httpServer";
import Middlewares from "./app/core/middlewares";
import Routes from "./app/core/routes";
import Swagger from "./app/swagger";

let app: express.Application = express();

Database.connect();

app = Middlewares.apply(app);
app = Routes.apply(app);
app = Swagger.apply(app);
app = Handlers.apply(app);

HttpServer.start(app);
