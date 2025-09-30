import express from "express";
import { UserController } from "./identity/interfaces/http/UserController";
import { RecipeController } from "./recipeBook/interfaces/http/RecipeController";
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json";

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Controllers
const userController = new UserController();
const recipeController = new RecipeController();

// Routes
app.get("/", (_req, res) => {
  res.send("Pastaga !");
});

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// User routes
app.post("/users", (req, res) => userController.createUser(req, res));

// Recipe routes
app.post("/recipes", (req, res) => recipeController.createRecipe(req, res));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
