import { Request, Response } from "express";
import { createRecipe } from "../../application/createRecipe";
import { createRecipeSchema } from "./schemas";
import { findRecipes } from "../../application/findRecipes";

export class RecipeController {
  async createRecipe(req: Request, res: Response) {
    try {
      const parsed = createRecipeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      const newRecipe = createRecipe(parsed.data);

      res.status(201).json({
        id: newRecipe.id,
        name: newRecipe.name,
        authorId: newRecipe.authorId,
        ingredientsList: newRecipe.ingredientsList.map((ing) => ({
          ingredient: ing.ingredient.name,
          amount: ing.quantity.amount,
          unit: ing.quantity.unit,
        })),
        steps: newRecipe.steps.map((step) => ({
          number: step.number,
          instructions: step.instructions,
        })),
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }

  async findRecipes(req: Request, res: Response) {
    try {
      const recipes = findRecipes();

      res.status(200).json(
        recipes.map((recipe) => ({
          id: recipe.id,
          name: recipe.name,
          authorId: recipe.authorId,
          ingredientsList: recipe.ingredientsList.map((ing) => ({
            ingredient: ing.ingredient.name,
            amount: ing.quantity.amount,
            unit: ing.quantity.unit,
          })),
          steps: recipe.steps.map((step) => ({
            number: step.number,
            instructions: step.instructions,
          })),
        })),
      );
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }
}
