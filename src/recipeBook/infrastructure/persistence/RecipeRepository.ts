import { Recipe } from "../../domain/recipe/Recipe";
import { QuantityUnit } from "../../domain/recipe/Quantity";
import { RecipeRepository as RecipeRepositoryInterface } from "../../domain/recipe/RecipeRepository";
import { randomUUID } from "crypto";
import { IngredientName } from "../../domain/recipe/Ingredient";

const recipes: {
  id: string;
  name: string;
  authorId: string;
  ingredients: {
    ingredient: IngredientName;
    quantity: number;
    unit: QuantityUnit;
  }[];
  steps: {
    instructions: string;
    number: number;
  }[];
}[] = [];

export class RecipeRepository implements RecipeRepositoryInterface {
  nextId() {
    return randomUUID();
  }

  save(recipe: Recipe) {
    const recipeToSave = {
      id: recipe.id,
      name: recipe.name,
      authorId: recipe.authorId,
      ingredients: recipe.ingredientsList.map((ingredientWithQuantity) => ({
        ingredient: ingredientWithQuantity.ingredient.name,
        quantity: ingredientWithQuantity.quantity.amount,
        unit: ingredientWithQuantity.quantity.unit,
      })),
      steps: recipe.steps.map((step) => ({
        instructions: step.instructions,
        number: step.number,
      })),
    };
    recipes.push(recipeToSave);
  }

  find(id: string) {
    const storedRecipe = recipes.find((r) => r.id === id);
    if (!storedRecipe) {
      return null;
    }

    const recipe = Recipe.create({
      id: storedRecipe.id,
      name: storedRecipe.name,
      authorId: storedRecipe.authorId,
      ingredientsList: storedRecipe.ingredients.map((ingredientLine) => ({
        ingredient: ingredientLine.ingredient,
        amount: ingredientLine.quantity,
        unit: ingredientLine.unit,
      })),
      steps: storedRecipe.steps.map((step) => ({
        instructions: step.instructions,
        number: step.number,
      })),
    });

    return recipe;
  }
}
