import { CreateRecipeProps, Recipe } from "../domain/recipe/Recipe";
import { RecipeRepository } from "../infrastructure/persistence/RecipeRepository";

export const createRecipe = (recipe: Omit<CreateRecipeProps, "id">) => {
  const recipeRepository = new RecipeRepository();
  const id = recipeRepository.nextId();
  const newRecipe = Recipe.create({ ...recipe, id });
  recipeRepository.save(newRecipe);
  return newRecipe;
};
