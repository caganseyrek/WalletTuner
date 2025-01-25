import dotenv from "dotenv";
import { z, ZodSchema } from "zod";

import logger from "@/utils/logger";

import { UtilsTypes } from "@/types/utils";

dotenv.config();

const configSchema: ZodSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  SERVER_PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default("3000"),
  JWT_ACCESS_SECRET: z.string().min(88),
  JWT_REFRESH_SECRET: z.string().min(88),
  COOKIE_SECRET: z.string().min(88),
  DATABASE_URI_START: z.string().min(1),
  DATABASE_URI_END: z.string().min(1),
  CLIENT_URL: z.string().url().min(1),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  logger.error(`Cannot parse environment variables: ${parsedConfig.error.message}`);
  process.exit(1);
}

const config: UtilsTypes.ConfigTypes.EnvProps = {
  NODE_ENV: parsedConfig.data.NODE_ENV,
  SERVER_PORT: parsedConfig.data.SERVER_PORT,
  SECRETS: {
    JWT_ACCESS: parsedConfig.data.JWT_ACCESS_SECRET,
    JWT_REFRESH: parsedConfig.data.JWT_REFRESH_SECRET,
    COOKIE: parsedConfig.data.COOKIE_SECRET,
  },
  DATABASE: {
    URI_START: parsedConfig.data.DATABASE_URI_START,
    URI_END: parsedConfig.data.DATABASE_URI_END,
  },
  CLIENT_URL: parsedConfig.data.CLIENT_URL,
};

export default config;
