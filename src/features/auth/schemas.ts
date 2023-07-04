import { z } from "zod";

export const BackendUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password must be entered.",
  }),
});

export const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});
