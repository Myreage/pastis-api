import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./identity/interfaces/http/UserController";
import { RecipeController } from "./recipeBook/interfaces/http/RecipeController";
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Controllers
const userController = new UserController();
const recipeController = new RecipeController();

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, "SUPERSECRET", { expiresIn: "1h" });
    return res.json({ token });
  }
});

// Auth middleware
const auth = (
  req: Request & { user?: JwtPayload | string },
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, "SUPERSECRET", (err, user) => {
    if (err || !user) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User routes
app.post("/users", (req, res) => userController.createUser(req, res));

// Recipe routes
app.post("/recipes", auth, (req, res) =>
  recipeController.createRecipe(req, res),
);
app.get("/recipes", auth, (req, res) => recipeController.findRecipes(req, res));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
