import { Request, Response } from "express";
import { createUser } from "../../application/createUser";
import { createUserSchema } from "./schemas";

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const parsed = createUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      const newUser = createUser(parsed.data);

      res.status(201).json({
        id: newUser.id,
        pseudo: newUser.pseudo,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }
}
