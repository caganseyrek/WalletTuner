import mongoose from "mongoose";

import logger from "@/utils/logger";

import env from "./env";

class DbConnection {
  private connection?: mongoose.Mongoose;

  async connect(): Promise<this> {
    try {
      this.connection = await mongoose.connect(env.DATABASE.URI_START + env.DATABASE.URI_END);
      mongoose.connection.on("error", (error) =>
        logger.error(`Something went wrong with the database connection: ${error}`),
      );
      mongoose.connection.once("open", () =>
        logger.info("Successfully connected to the database."),
      );
      return this;
    } catch (error) {
      logger.error(`An error ocurred while connecting: ${error}`);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.connection?.disconnect();
      return;
    } catch (error) {
      logger.error(`An error ocurred while disconnecting: ${error}`);
      process.exit(1);
    }
  }
}

export default DbConnection;
