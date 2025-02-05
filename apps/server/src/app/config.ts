import dotenv from "dotenv";
import { z, ZodSchema } from "zod";

import logger from "@/utils/logger";

type EnvironmentType = "development" | "production" | "test";

export interface ConfigProps {
  NODE_ENV: EnvironmentType;
  SERVER_PORT: string;
  CLIENT_URL: string;
  DATABASE_URI: string;
  SECRETS: {
    JWT_ACCESS: string;
    JWT_REFRESH: string;
    COOKIE: string;
  };
}

dotenv.config();

const configSchema: ZodSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "preprod", "prod"]).default("dev"),
  SERVER_PORT: z
    .string()
    .default("3000")
    .transform((value) => parseInt(value, 10)),
  CLIENT_URL: z.string().url().nonempty(),
  DATABASE_URI: z.string().nonempty(),
  JWT_ACCESS_SECRET: z.string().nonempty(),
  JWT_REFRESH_SECRET: z.string().nonempty(),
  COOKIE_SECRET: z.string().nonempty(),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success || parsedConfig.error) {
  logger.error(`Cannot parse environment variables: ${parsedConfig.error.message}`);
  process.exit(1);
}

/**
 * Application configuration object.
 */
const config: ConfigProps = {
  NODE_ENV: parsedConfig.data.NODE_ENV,
  SERVER_PORT: parsedConfig.data.SERVER_PORT,
  CLIENT_URL: parsedConfig.data.CLIENT_URL,
  DATABASE_URI: parsedConfig.data.DATABASE_URI,
  SECRETS: {
    JWT_ACCESS: parsedConfig.data.JWT_ACCESS_SECRET,
    JWT_REFRESH: parsedConfig.data.JWT_REFRESH_SECRET,
    COOKIE: parsedConfig.data.COOKIE_SECRET,
  },
};

export default config;
