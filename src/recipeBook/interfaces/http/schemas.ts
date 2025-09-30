import { z } from "zod";

const ingredientName = z.enum(["apple", "carrot"]);
const quantityUnit = z.enum(["kg", "cs", "cc", "L", "mL"]);

export const createRecipeSchema = z.object({
  name: z.string().min(1),
  authorId: z.string().min(1),
  ingredientsList: z
    .array(
      z.object({
        ingredient: ingredientName,
        amount: z.number().positive(),
        unit: quantityUnit,
      })
    )
    .default([]),
  steps: z
    .array(
      z.object({
        number: z.number().int().positive(),
        instructions: z.string().min(1).max(1000),
      })
    )
    .default([]),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;


