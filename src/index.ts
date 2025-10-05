import express from "express";
import * as z from "zod";
import cors from "cors";
import {
  createRecipe,
  deleteRecipe,
  findRecipe,
  findRecipes,
  updateRecipe,
} from "./application/recipe";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/recipes", (_req, res) => {
  const recipes = findRecipes();
  res.status(200).json(recipes);
});

app.get("/recipes/:id", (req, res) => {
  const recipe = findRecipe(req.params.id);
  if (!recipe) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(recipe);
});

const RecipeBody = z.object({
  name: z.string(),
  description: z.string(),
  timeInMinutes: z.number(),
  difficulty: z.number(),
  tags: z.array(z.string()),
  ingredients: z.array(
    z.object({
      name: z.enum(["apple", "pasta"]),
      quantity: z.number(),
      unit: z.enum(["kg", "g"]),
    }),
  ),
  steps: z.array(
    z.object({
      number: z.number(),
      description: z.string(),
    }),
  ),
});

app.post("/recipes", (req, res) => {
  console.log(req.body);
  const bodyParsingResult = RecipeBody.safeParse(req.body);
  if (!bodyParsingResult.success) {
    res.status(400).json(z.treeifyError(bodyParsingResult.error));
    return;
  }
  const createdRecipe = createRecipe(bodyParsingResult.data);
  if ("error" in createdRecipe) {
    res.status(400).json(createdRecipe);
    return;
  }
  res.status(201).json(createdRecipe);
});

app.put("/recipes/:id", (req, res) => {
  const updatedRecipe = updateRecipe({ ...req.body, id: req.params.id });
  if ("error" in updatedRecipe) {
    res.status(400).json(updatedRecipe);
    return;
  }
  res.status(200).json(updatedRecipe);
});

app.delete("/recipes/:id", (req, res) => {
  deleteRecipe(req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Pastis Recipe listening on port ${port}`);
});
