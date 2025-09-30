import { RecipeRepository } from "../infrastructure/persistence/RecipeRepository";

export const findRecipes = () => {
  const recipeRepository = new RecipeRepository();

  return recipeRepository.findAll();
};
