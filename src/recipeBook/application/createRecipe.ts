import { UserRepository } from "../../identity/infrastructure/UserRepository";
import { CreateRecipeProps, Recipe } from "../domain/recipe/Recipe";
import { RecipeRepository } from "../infrastructure/persistence/RecipeRepository";

export const createRecipe = (recipe: Omit<CreateRecipeProps, "id">) => {
  // TODO:Cross BC call => bad, to refacto
  const userRepository = new UserRepository();
  const user = userRepository.findById(recipe.authorId);

  if (!user) {
    throw new Error("User does not exist");
  }

  const recipeRepository = new RecipeRepository();
  const id = recipeRepository.nextId();
  const newRecipe = Recipe.create({ ...recipe, id });
  recipeRepository.save(newRecipe);
  return newRecipe;
};
