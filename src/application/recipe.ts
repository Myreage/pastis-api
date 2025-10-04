import {
  createRecipe as createRecipeDomain,
  updateRecipe as updateRecipeDomain,
  CreateRecipeInput,
  UpdateRecipeInput,
} from "../domain/recipe";
import { recipeRepository } from "../infrastructure/recipeRepository";

export const createRecipe = (
  input: Omit<CreateRecipeInput, "id" | "idAlreadyTaken">,
) => {
  const id = recipeRepository.generateId();
  const existing = recipeRepository.findOne(id);
  const createdRecipe = createRecipeDomain({
    ...input,
    id,
    idAlreadyTaken: !!existing,
  });

  if ("error" in createdRecipe) {
    return createdRecipe;
  }

  recipeRepository.save(createdRecipe);

  return createdRecipe;
};

export const updateRecipe = (input: UpdateRecipeInput & { id: string }) => {
  const recipe = recipeRepository.findOne(input.id);
  if (!recipe) {
    return { error: "not_found" };
  }

  const updatedRecipe = updateRecipeDomain(recipe)(input);

  if ("error" in updatedRecipe) {
    return updatedRecipe;
  }

  recipeRepository.save(updatedRecipe);

  return updatedRecipe;
};

export const deleteRecipe = (id: string) => {
  recipeRepository.delete(id);
};

export const findRecipe = (id: string) => {
  return recipeRepository.findOne(id);
};

export const findRecipes = () => {
  return recipeRepository.find();
};
