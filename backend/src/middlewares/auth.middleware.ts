import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  if (!token || typeof token !== "string") {
    return res
      .status(401)
      .json({ error: "Token não fornecido ou mal formatado" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || typeof jwtSecret !== "string") {
      return res.status(500).json({ error: "Segredo JWT não configurado" });
    }

    const decoded = jwt.verify(token, jwtSecret);

    console.log("Decoded token:", decoded);

    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      req.userId = (decoded as JwtPayload).id;
      return next();
    }

    console.log("Decoded token não é do tipo JwtPayload:", decoded);
    return res.status(401).json({ error: "Token inválido" });
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}