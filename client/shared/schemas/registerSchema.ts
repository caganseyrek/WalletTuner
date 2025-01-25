import i18next from "i18next";
import { z, ZodSchema } from "zod";

export const registerSchema: ZodSchema = z.object({
  name: z.string({ required_error: i18next.t("forms.schemas.required") }).min(1, i18next.t("forms.schemas.required")),
  surname: z
    .string({ required_error: i18next.t("forms.schemas.required") })
    .min(1, i18next.t("forms.schemas.required")),
  email: z
    .string({ required_error: i18next.t("forms.schemas.required") })
    .min(1, i18next.t("forms.schemas.required"))
    .email(i18next.t("forms.schemas.invalidEmail")),
  password1: z
    .string({ required_error: i18next.t("forms.schemas.required") })
    .min(1, i18next.t("forms.schemas.required")),
  password2: z
    .string({ required_error: i18next.t("forms.schemas.required") })
    .min(1, i18next.t("forms.schemas.required")),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
