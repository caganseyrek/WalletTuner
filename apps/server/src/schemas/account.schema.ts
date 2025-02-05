import { z } from "zod";

export const createSchema = z.object({
  user_id: z.string().nonempty(),
  name: z.string().nonempty(),
});

export const updateSchema = z.object({
  user_id: z.string().nonempty(),
  _id: z.string().nonempty(),
  name: z.string().nonempty(),
});

export const deleteSchema = z.object({
  user_id: z.string().nonempty(),
  _id: z.string().nonempty(),
});

export type CreateSchemaParams = z.infer<typeof createSchema>;
export type UpdateSchemaParams = z.infer<typeof updateSchema>;
export type DeleteSchemaParams = z.infer<typeof deleteSchema>;
