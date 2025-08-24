import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./modules/users/users.routes";
import { moviesRouter } from "./modules/movies/movies.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/movies", moviesRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;