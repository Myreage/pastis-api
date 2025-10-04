type IngredientName = "apple" | "pasta";
type Unit = "kg" | "g";

type Ingredient = {
  name: IngredientName;
  quantity: number;
  unit: Unit;
};

type Step = {
  number: number;
  description: string;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  timeInMinutes: number;
  difficulty: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
};

export type CreateRecipeInput = {
  id: string;
  idAlreadyTaken: boolean;
  name: string;
  description: string;
  timeInMinutes: number;
  difficulty: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
};

type CreateRecipeOutput =
  | Recipe
  | {
      error:
        | "bad_name"
        | "bad_id"
        | "bad_time"
        | "bad_difficulty"
        | "bad_ingredients"
        | "bad_steps";
    };

const validateName = (name: string) => {
  return name.length > 0;
};

const validateId = (id: string, idAlreadyTaken: boolean) => {
  return idAlreadyTaken || id.length > 0;
};

const validateDifficulty = (difficulty: number) => {
  return difficulty > 0 && difficulty <= 5;
};

const validateIngredients = (ingredients: Ingredient[]) => {
  if (ingredients.length <= 0) {
    return false;
  }
  if (
    ingredients.some(
      (ingredient) => ingredient.name.length <= 0 || ingredient.quantity <= 0,
    )
  ) {
    return false;
  }
  return true;
};

const validateSteps = (steps: Step[]) => {
  if (steps.length <= 0) {
    return false;
  }
  if (steps.some((step) => step.description.length <= 0)) {
    return false;
  }
  const stepNumbers = steps.map((step) => step.number);
  const duplicates = stepNumbers.filter(
    (stepNumber, index) => index !== stepNumbers.indexOf(stepNumber),
  );
  if (duplicates.length > 0) {
    return false;
  }
  return true;
};

export const createRecipe = (input: CreateRecipeInput): CreateRecipeOutput => {
  if (!validateId(input.id, input.idAlreadyTaken)) {
    return { error: "bad_id" };
  }
  if (!validateName(input.name)) {
    return { error: "bad_name" };
  }
  if (!validateDifficulty(input.difficulty)) {
    return { error: "bad_difficulty" };
  }

  if (!validateIngredients(input.ingredients)) {
    return { error: "bad_ingredients" };
  }

  if (!validateSteps(input.steps)) {
    return { error: "bad_steps" };
  }

  return {
    difficulty: input.difficulty,
    id: input.id,
    ingredients: input.ingredients,
    name: input.name,
    steps: input.steps,
    description: input.description,
    tags: input.tags.filter((tag) => tag.length > 0),
    timeInMinutes: input.timeInMinutes,
  };
};

export type UpdateRecipeInput = {
  name: string;
  description: string;
  timeInMinutes: number;
  difficulty: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
};

type UpdateRecipeOutput =
  | Recipe
  | {
      error:
        | "bad_name"
        | "bad_id"
        | "bad_time"
        | "bad_difficulty"
        | "bad_ingredients"
        | "bad_steps";
    };

export const updateRecipe =
  (recipe: Recipe) =>
  (input: UpdateRecipeInput): UpdateRecipeOutput => {
    if (!validateName(input.name)) {
      return { error: "bad_name" };
    }
    if (!validateDifficulty(input.difficulty)) {
      return { error: "bad_difficulty" };
    }

    if (!validateIngredients(input.ingredients)) {
      return { error: "bad_ingredients" };
    }

    if (!validateSteps(input.steps)) {
      return { error: "bad_steps" };
    }

    return {
      description: input.description,
      difficulty: input.difficulty,
      id: recipe.id,
      ingredients: input.ingredients,
      name: input.name,
      steps: input.steps,
      timeInMinutes: input.timeInMinutes,
      tags: input.tags,
    };
  };
