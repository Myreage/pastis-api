import { randomUUID } from "crypto";
import { Recipe } from "../domain/recipe";
import { RecipeRepository } from "../domain/recipeRepository";

const recipes: Recipe[] = [
  {
    description: "Carbo miam miam",
    difficulty: 1,
    id: "carbo-miam",
    ingredients: [{ name: "pasta", unit: "g", quantity: 150 }],
    name: "Carbo franchouillarde",
    steps: [],
    tags: ["vitef", "confort"],
    timeInMinutes: 30,
  },
];

export const recipeRepository: RecipeRepository = {
  generateId: () => {
    return randomUUID();
  },
  save: (recipe: Recipe) => {
    const index = recipes.findIndex((r) => recipe.id === r.id);
    if (index !== -1) {
      recipes.splice(index, 1);
    }
    recipes.push(recipe);
  },
  findOne: (id: string) => recipes.find((recipe) => recipe.id === id) ?? null,
  find: () => recipes,
  delete: (id) => {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      recipes.splice(index, 1);
    }
  },
};
