import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { z } from "zod";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export const createSchema = z.object({
  account_id: z.string().nonempty(),
  type: z.enum(["income", "expense"]),
  amount: z.number().nonnegative(),
  timestamp: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  note: z.string().nonempty(),
});

export const updateSchema = z.object({
  _id: z.string().nonempty(),
  account_id: z.string().nonempty(),
  type: z.enum(["income", "expense"]),
  amount: z.number().nonnegative(),
  timestamp: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  note: z.string().nonempty(),
});

export const deleteSchema = z.object({
  _id: z.string().nonempty(),
});

export type CreateSchemaParams = z.infer<typeof createSchema>;
export type UpdateSchemaParams = z.infer<typeof updateSchema>;
export type DeleteSchemaParams = z.infer<typeof deleteSchema>;
