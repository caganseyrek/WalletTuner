import { z } from "zod";

export const registerSchema = z.object({
  full_name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const logoutSchema = z.object({
  user_id: z.string().nonempty(),
});

export const newAccessTokenSchema = z.object({
  user_id: z.string().nonempty(),
  refreshToken: z.string().nonempty(),
});

export const getUserDetailsSchema = z.object({
  user_id: z.string().nonempty(),
});

export const updateUserSchema = z.object({
  user_id: z.string().nonempty(),
  full_name: z.string().nonempty(),
});

export const deleteUserSchema = z.object({
  user_id: z.string().nonempty(),
});

export type RegisterSchemaParams = z.infer<typeof registerSchema>;
export type LoginSchemaParams = z.infer<typeof loginSchema>;
export type LogoutSchemaParams = z.infer<typeof logoutSchema>;
export type NewAccessTokenSchemaParams = z.infer<typeof newAccessTokenSchema>;
export type GetUserDetailsSchemaParams = z.infer<typeof getUserDetailsSchema>;
export type UpdateUserSchemaSchemaParams = z.infer<typeof updateUserSchema>;
export type DeleteUserSchemaSchemaParams = z.infer<typeof deleteUserSchema>;
