import { z, ZodSchema } from "zod";

export const newTokenSchema: ZodSchema = z.object({
  currentUser: z.string().min(1),
  refreshTokenF: z.string().min(1),
});
