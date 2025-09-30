import { Recipe } from "./Recipe";

export interface RecipeRepository {
  save: (recipe: Recipe) => void;
  find: (id: string) => Recipe | null;
  findByAuthor: (authorId: string) => Recipe[];
  findAll: () => Recipe[];
  nextId: () => string;
}
