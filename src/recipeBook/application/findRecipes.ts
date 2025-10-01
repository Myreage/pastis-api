import { RecipeRepository } from "../infrastructure/persistence/RecipeRepository";

type Args = {
  authorId?: string;
};

export const findRecipes = (args: Args) => {
  const recipeRepository = new RecipeRepository();

  return recipeRepository.findAll(args);
};
