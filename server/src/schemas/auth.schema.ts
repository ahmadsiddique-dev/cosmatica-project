import { z } from "zod";

export const signupSchema = z.object({
    userName: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(100, "Username is too long"),
    fullName: z
        .string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(100, "Full name is too long"),
    email: z
        .email("Please enter a valid email address")
        .max(100, "Email is too long")
        .transform((email) => email.toLowerCase()),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long"),
});

export const loginSchema = z.object({
    email: z
        .email("Please enter a valid email address")
        .max(100, "Email is too long")
        .transform((email) => email.toLowerCase()),
    password: z
        .string()
        .min(1, "Password is required")
        .max(100, "Password is too long"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
