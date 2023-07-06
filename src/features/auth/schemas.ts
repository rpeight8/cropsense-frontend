import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  roles: z.array(z.string()).optional(),
});

export const UserForSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const UserForSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Enter a password",
  }),
});

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z.string().min(1).optional(),
});
