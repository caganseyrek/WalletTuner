import express from "express";

import AppBuilder from "./app/appBuilder";

const app: express.Application = express();

new AppBuilder(app).build().startApp();
