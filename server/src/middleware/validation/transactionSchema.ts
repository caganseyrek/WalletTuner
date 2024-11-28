import { z, ZodSchema } from "zod";

export const getTransactionsSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
});

export const createTransactionSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  accountId: z.string().min(1),
  transactionType: z.enum(["inc", "exp"]),
  transactionDescription: z.string().min(1),
  transactionDateTime: z.string().min(1),
  transactionValue: z.number().positive(),
});

export const updateTransactionSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  accountId: z.string().min(1),
  transactionId: z.string().min(1),
  transactionType: z.enum(["inc", "exp"]),
  transactionDescription: z.string().min(1),
  transactionDateTime: z.date(),
  transactionValue: z.number().positive(),
});

export const deleteTransactionSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  transactionId: z.string().min(1),
});
