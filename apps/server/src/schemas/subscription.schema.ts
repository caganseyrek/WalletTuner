import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { z } from "zod";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export const createSchema = z.object({
  user_id: z.string().nonempty(),
  name: z.string().nonempty(),
  amount: z.number().nonnegative(),
  billing_cycle: z.enum(["monthly", "yearly"]),
  next_payment_date: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  paid_from: z.string().nonempty(),
  is_active: z.boolean(),
});

export const updateSchema = z.object({
  user_id: z.string().nonempty(),
  _id: z.string().nonempty(),
  name: z.string().nonempty(),
  amount: z.number().nonnegative(),
  billing_cycle: z.enum(["monthly", "yearly"]),
  next_payment_date: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  paid_from: z.string().nonempty(),
  is_active: z.boolean(),
});

export const deleteSchema = z.object({
  user_id: z.string().nonempty(),
  _id: z.string().nonempty(),
});

export type CreateSchemaParams = z.infer<typeof createSchema>;
export type UpdateSchemaParams = z.infer<typeof updateSchema>;
export type DeleteSchemaParams = z.infer<typeof deleteSchema>;
