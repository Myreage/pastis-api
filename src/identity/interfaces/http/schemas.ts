import { z } from "zod";

export const createUserSchema = z.object({
  pseudo: z.string().min(1, "Pseudo cannot be empty").max(100, "Pseudo must be less than 100 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;


