import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { z } from "zod";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export const createSchema = z.object({
  user_id: z.string().nonempty(),
  account_id: z.string().nonempty(),
  name: z.string().nonempty(),
  target_amount: z.number().nonnegative(),
  start_date: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  end_date: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  status: z.enum(["not_started", "ongoing", "success", "failed"]),
});

export const updateSchema = z.object({
  user_id: z.string().nonempty(),
  _id: z.string().nonempty(),
  account_id: z.string().nonempty(),
  name: z.string().nonempty(),
  target_amount: z.number().nonnegative(),
  start_date: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  end_date: z
    .string()
    .nonempty()
    .refine((value) => dayjs(value).isValid()),
  status: z.enum(["not_started", "ongoing", "success", "failed"]),
});

export const deleteSchema = z.object({
  user_id: z.string().nonempty(),
  _id: z.string().nonempty(),
});

export type CreateSchemaParams = z.infer<typeof createSchema>;
export type UpdateSchemaParams = z.infer<typeof updateSchema>;
export type DeleteSchemaParams = z.infer<typeof deleteSchema>;
