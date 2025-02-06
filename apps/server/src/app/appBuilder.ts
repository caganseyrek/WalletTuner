import express from "express";
import mongoose from "mongoose";

import logger from "@/utils/logger";

import config from "./config";
import Handlers from "./core/handlers";
import HttpServer from "./core/httpServer";
import Middlewares from "./core/middlewares";
import Routes from "./core/routes";
import Swagger from "./extensions/swagger";

class AppBuilder {
  private app: express.Application;
  private handlers: Handlers;
  private middlewares: Middlewares;
  private routes: Routes;
  private swagger: Swagger;
  private httpServer: HttpServer;

  /**
   * Initializes the AppBuilder with an Express application instance.
   * @param {express.Application} app - The Express application instance.
   */
  constructor(app: express.Application) {
    this.app = app;
    this.handlers = new Handlers();
    this.middlewares = new Middlewares();
    this.routes = new Routes();
    this.swagger = new Swagger();
    this.httpServer = new HttpServer();
  }

  /**
   * Applies middlewares, routes, handlers, and Swagger to the Express application.
   * @returns {this} The current instance of AppBuilder for method chaining.
   */
  public build(): this {
    this.app = this.middlewares.apply(this.app);
    this.app = this.routes.apply(this.app);
    this.app = this.handlers.apply(this.app);
    this.app = this.swagger.apply(this.app);

    return this;
  }

  /**
   * Establishes a connection to the MongoDB database and starts the HTTP server.
   */
  public startApp(): void {
    mongoose.connect(config.DATABASE_URI);
    mongoose.connection.on("error", (error) =>
      logger.error("Something went wrong with the database connection: " + error),
    );
    mongoose.connection.once("open", () => logger.info("Successfully connected to the database."));

    this.httpServer.start(this.app);
  }
}

export default AppBuilder;
