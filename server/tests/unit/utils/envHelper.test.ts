import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { beforeEach } from "node:test";
import { z, ZodSchema } from "zod";

import logger from "@/utils/logger";

import ConfigTypes from "@/types/config";

const envSchema: ZodSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  SERVER_PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default("3000"),
  SECRETS: z.object({
    JWT_ACCESS: z.string().min(88),
    JWT_REFRESH: z.string().min(88),
    COOKIE: z.string().min(88),
  }),
  DATABASE: z.object({
    URI_START: z.string().min(1),
    URI_END: z.string().min(1),
  }),
  CLIENT_URL: z.string().url().min(1),
});

describe("EnvHelper Utility", () => {
  beforeEach(() => {
    jest.spyOn(logger, "error").mockImplementation(() => {
      return logger;
    });
    jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const testEnv: ConfigTypes.EnvProps = {
    NODE_ENV: "development",
    SERVER_PORT: "3000",
    SECRETS: {
      JWT_ACCESS: "a".repeat(88),
      JWT_REFRESH: "r".repeat(88),
      COOKIE: "c".repeat(88),
    },
    DATABASE: {
      URI_START: "provider://localhost",
      URI_END: "/something?isSomething=true",
    },
    CLIENT_URL: "http://localhost:0000",
  };

  it("should parse valid env variables successfully", () => {
    const validEnv = testEnv;
    const parsed = envSchema.safeParse(validEnv);

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      const parsedVars: ConfigTypes.EnvProps = parsed.data;

      expect(parsedVars.NODE_ENV).toBe("development");
      expect(parsedVars.SERVER_PORT).toBe(3000);
      expect(parsedVars.SECRETS.JWT_ACCESS).toBe("a".repeat(88));
      expect(parsedVars.SECRETS.JWT_REFRESH).toBe("r".repeat(88));
      expect(parsedVars.SECRETS.COOKIE).toBe("c".repeat(88));
      expect(parsedVars.DATABASE.URI_START).toBe(testEnv.DATABASE.URI_START);
      expect(parsedVars.DATABASE.URI_END).toBe(testEnv.DATABASE.URI_END);
      expect(parsedVars.CLIENT_URL).toBe(testEnv.CLIENT_URL);
    }
  });

  it("should fail if required env variables are missing", () => {
    const invalidEnv = {
      ...testEnv,
      SECRETS: {
        ...testEnv.SECRETS,
        JWT_ACCESS: undefined,
      },
    };
    const parsed = envSchema.safeParse(invalidEnv);

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: ["SECRETS", "JWT_ACCESS"] })]),
      );
    }
  });

  it("should fail if env variables have invalid values", () => {
    const invalidEnv = {
      ...testEnv,
      CLIENT_URL: "not a url",
    };
    const parsed = envSchema.safeParse(invalidEnv);

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues).toEqual(expect.arrayContaining([expect.objectContaining({ path: ["CLIENT_URL"] })]));
    }
  });

  // it("should exit process if env variables cannot be parsed successfully", () => {
  //   const emptyEnv = {};
  //   const parsed = envSchema.safeParse(emptyEnv);
  //   if (!parsed.success) {
  //     expect(logger.error).toHaveBeenCalled();
  //     expect(logger.error).toHaveBeenCalledWith(expect.stringContaining("Cannot parse environment variables:"));
  //     expect(process.exit).toHaveBeenCalledWith(1);
  //   }
  // });
});
