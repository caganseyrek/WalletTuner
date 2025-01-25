import { z } from "zod";

const schemas = {
  account: {
    createSchema: z.object({ accountName: z.string().nonempty() }),
    updateSchema: z.object({ accountName: z.string().nonempty(), accountId: z.string().nonempty() }),
    deleteSchema: z.object({ accountId: z.string().nonempty() }),
  },
  transaction: {
    createSchema: z.object({
      accountId: z.string().nonempty(),
      transactionType: z.enum(["inc", "exp"]),
      transactionDescription: z.string().nonempty(),
      transactionDateTime: z.string().nonempty(),
      transactionValue: z.number().positive(),
    }),
    updateSchema: z.object({
      accountId: z.string().nonempty(),
      transactionId: z.string().nonempty(),
      transactionType: z.enum(["inc", "exp"]),
      transactionDescription: z.string().nonempty(),
      transactionDateTime: z.date(),
      transactionValue: z.number().positive(),
    }),
    deleteSchema: z.object({
      transactionId: z.string().nonempty(),
    }),
  },
  user: {
    loginSchema: z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    }),
    registerSchema: z.object({
      name: z.string().nonempty(),
      surname: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    }),

    updateSchema: z.object({
      name: z.string().nonempty(),
      surname: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
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
      preferredCurrency: z.enum(["USD", "GBP", "EUR", "JPY", "CNY", "BRL", "RUB", "KRW", "SAR", "SEK", "INR"]),
      preferredCurrencyDisplay: z.enum(["code", "name", "symbol", "narrowSymbol"]),
    }),
    deleteSchema: z.object({
      password: z.string().nonempty(),
    }),
  },
};

export default schemas;
