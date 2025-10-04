import { Recipe } from "./recipe";

export interface RecipeRepository {
  generateId: () => string;
  save: (recipe: Recipe) => void;
  findOne: (id: string) => Recipe | null;
  find: () => Recipe[];
  delete: (id: string) => void;
}
