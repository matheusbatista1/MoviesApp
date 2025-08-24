import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {
  static async register(req: Request, res: Response) {
    try {
      const result = await UsersService.register(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UsersService.login(email, password);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}