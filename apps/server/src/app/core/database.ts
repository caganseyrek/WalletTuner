import mongoose from "mongoose";

import logger from "@/utils/logger";

import config from "../config";

/**
 * Class for managing database connections using Mongoose.
 * Handles connecting to and disconnecting from the configured MongoDB database.
 */
class Database {
  private static dbConn: mongoose.Mongoose;

  /**
   * Connects to the configured MongoDB database.
   * Logs a success message upon successful connection and an error message if the connection fails.
   *
   * @returns {Promise<void>} A promise that resolves when the connection process is complete.
   */
  public static async connect(): Promise<void> {
    this.dbConn = await mongoose.connect(config.DATABASE_URI);
    mongoose.connection.on("error", (error) =>
      logger.error("Something went wrong with the database connection: " + error),
    );
    mongoose.connection.once("open", () => logger.info("Successfully connected to the database."));
  }

  /**
   * Disconnects from the configured MongoDB database.
   * Logs an error message if the disconnection fails.
   *
   * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
   */
  public static async disconnect(): Promise<void> {
    try {
      await this.dbConn.disconnect();
    } catch (error) {
      logger.error("An error ocurred while trying to disconnect from the database: " + error);
    }
  }
}

export default Database;
