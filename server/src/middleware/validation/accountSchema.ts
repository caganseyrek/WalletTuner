import { z, ZodSchema } from "zod";

export const getAccountSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
});

export const createAccountSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  accountName: z.string().min(1),
});

export const updateAccountSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  accountName: z.string().min(1),
  accountId: z.string().min(1),
});

export const deleteAccountSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  accountId: z.string().min(1),
});
