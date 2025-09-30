import { Recipe } from "./Recipe";

export interface RecipeRepository {
  save: (recipe: Recipe) => void;
  find: (id: string) => Recipe | null;
  nextId: () => string;
}
