import dotenv from "dotenv";
import { z, ZodSchema } from "zod";

import logger from "@/utils/logger";

import ConfigTypes from "@/types/config";

dotenv.config();

const envSchema: ZodSchema = z.object({
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

const parsedVars = envSchema.safeParse(process.env);

if (!parsedVars.success) {
  logger.error(`Cannot parse environment variables: ${parsedVars.error.message}`);
  process.exit(1);
}

const env: ConfigTypes.EnvProps = parsedVars.data;

export default env;
