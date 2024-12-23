import { z } from "zod";

export const invitationSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("Full name is required")
      .min(3, "Full name is too short")
      .max(300, "Full name is too long"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    emailConfirmation: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
  })
  .refine((data) => data.email === data.emailConfirmation, {
    message: "Emails do not match",
    path: ["emailConfirmation"],
  });
