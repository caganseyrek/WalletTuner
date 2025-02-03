import express from "express";
import { IncomingMessage, Server, ServerResponse } from "http";

import logger from "../../utils/logger";

import config from "../config";
import Database from "./database";

/**
 * Class for managing the HTTP server and handling graceful shutdown.
 */
class HttpServer {
  private static server: Server<typeof IncomingMessage, typeof ServerResponse>;

  /**
   * Performs a graceful shutdown of the server.
   * This includes stopping the server and disconnecting from the database.
   * If an error occurs during the shutdown process, it logs the error and exits the process.
   *
   * @returns {Promise<void>} A promise that resolves when the shutdown process is complete.
   */
  private static async gracefulShutdown(): Promise<void> {
    try {
      this.server.close();
      await Database.disconnect();
    } catch (error) {
      logger.error(`An error ocurred while shutting down the server: ${error}`);
      process.exit(1);
    }
  }

  /**
   * Starts the HTTP server and listens for incoming requests.
   * It also sets up event listeners for graceful shutdown when receiving termination signals.
   *
   * @param {express.Application} app - The Express application instance.
   */
  public static start(app: express.Application): void {
    this.server = app.listen(config.SERVER_PORT, () => {
      logger.info(`Server started at port ${config.SERVER_PORT}`);
    });

    process.on("SIGTERM", async () => await this.gracefulShutdown());
    process.on("SIGINT", async () => await this.gracefulShutdown());
  }
}

export default HttpServer;
