import i18next from "i18next";
import { z, ZodSchema } from "zod";

export const loginSchema: ZodSchema = z.object({
  email: z
    .string({ required_error: i18next.t("publicForms.schemas.required") })
    .min(1, i18next.t("publicForms.schemas.required"))
    .email(i18next.t("publicForms.schemas.invalidEmail")),
  password: z
    .string({ required_error: i18next.t("publicForms.schemas.required") })
    .min(1, i18next.t("publicForms.schemas.required")),
});

export type LoginFormData = z.infer<typeof loginSchema>;
