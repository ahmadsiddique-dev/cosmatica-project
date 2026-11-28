import { z } from "zod";

export const signupSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters").max(100, "Full name is too long"),
        email: z.email("Please enter a valid email address").min(3).max(100),
        password: z.string().min(6, "Password must be at least 6 characters").max(100),
        confirmPassword: z.string().min(3, "Please confirm your password").max(100),
    })
    .refine((data) => data.password == data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"]
    })
