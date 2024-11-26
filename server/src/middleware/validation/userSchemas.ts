import { z, ZodSchema } from "zod";

export const identifierSchema: ZodSchema = z.object({
  currentUser: z.string().email().min(1),
});

export const registerUserSchema: ZodSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export const loginUserSchema: ZodSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export const updateUserSchema: ZodSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
  preferredFormat: z.enum([
    "en-US",
    "en-GB",
    "fr-FR",
    "de-DE",
    "es-ES",
    "it-IT",
    "ja-JP",
    "zh-CN",
    "ko-KR",
    "pt-BR",
    "ru-RU",
    "es-MX",
    "ar-SA",
    "nl-NL",
    "sv-SE",
    "en-IN",
  ]),
  preferredCurrency: z.enum([
    "USD",
    "GBP",
    "EUR",
    "JPY",
    "CNY",
    "BRL",
    "RUB",
    "KRW",
    "SAR",
    "SEK",
    "INR",
  ]),
  preferredCurrencyDisplay: z
    .enum(["code", "name", "symbol", "narrowSymbol"])
    .default("narrowSymbol"),
});

export const deleteUserSchema: ZodSchema = z.object({
  currentUser: z.string().email().min(1),
  password: z.string().min(1),
});
