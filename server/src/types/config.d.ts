import express from "express";
import mongoose from "mongoose";

namespace ConfigTypes {
  type NODE_ENV_TYPE = "development" | "production" | "test";

  export interface EnvProps {
    NODE_ENV: NODE_ENV_TYPE;
    SERVER_PORT: string;
    SECRETS: { JWT_ACCESS: string; JWT_REFRESH: string; COOKIE: string };
    DATABASE: { URI_START: string; URI_END: string };
    CLIENT_URL: string;
  }

  export interface ServerManagerTypes {
    app: express.Application;
    database: mongoose.Mongoose;
  }
}

export default ConfigTypes;
