import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

export const usersRouter = Router();

usersRouter.post("/register", UsersController.register);
usersRouter.post("/login", UsersController.login);

usersRouter.get("/me", authenticate, async (req, res) => {
  const user = await UsersService.findById(req.userId!);
  res.json(user);
});