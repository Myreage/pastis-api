import { IngredientName } from "./Ingredient";
import { IngredientLine } from "./IngredientLine";
import { QuantityUnit } from "./Quantity";
import { RecipeStep } from "./RecipeStep";

export type CreateRecipeProps = {
  id: string;
  name: string;
  authorId: string;
  ingredientsList: {
    ingredient: IngredientName;
    amount: number;
    unit: QuantityUnit;
  }[];
  steps: { instructions: string; number: number }[];
};

export class Recipe {
  private constructor(
    public id: string,
    public name: string,
    public authorId: string,
    public ingredientsList: IngredientLine[],
    public steps: RecipeStep[]
  ) {}

  public static create({
    authorId,
    id,
    ingredientsList,
    name,
    steps,
  }: CreateRecipeProps) {
    // Check for duplicate ingredients
    const uniqueIngredients = new Set(
      ingredientsList.map((ingredient) => ingredient.ingredient)
    );
    if (uniqueIngredients.size !== ingredientsList.length) {
      throw new Error("Duplicate ingredients found");
    }

    const ingredientsListObjects = ingredientsList.map((ingredient) =>
      IngredientLine.create(
        ingredient.ingredient,
        ingredient.amount,
        ingredient.unit
      )
    );

    // Check for duplicate steps
    const uniqueSteps = new Set(steps.map((step) => step.number));
    if (uniqueSteps.size !== steps.length) {
      throw new Error("Duplicate steps found");
    }

    const stepsObjects = steps.map(
      (step) => new RecipeStep(step.number, step.instructions)
    );
    return new Recipe(id, name, authorId, ingredientsListObjects, stepsObjects);
  }
}
