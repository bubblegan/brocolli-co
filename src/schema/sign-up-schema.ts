import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name is too short")
      .max(300, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    emailConfirmation: z.string().email("Invalid email address"),
  })
  .refine((data) => data.email === data.emailConfirmation, {
    message: "Emails do not match",
    path: ["emailConfirmation"],
  });
