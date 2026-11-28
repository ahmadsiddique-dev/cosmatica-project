import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address").min(3).max(100),
  password: z
    .string()
    .min(1, "Password must be at least 1 characters")
    .max(100),
});
