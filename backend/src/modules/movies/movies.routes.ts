import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { MoviesController } from "./movies.controller";
import { upload } from "./movies.s3";

export const moviesRouter = Router();

moviesRouter.use(authenticate);

// -------- MOVIES --------
moviesRouter.post("/", MoviesController.create);
moviesRouter.get("/", MoviesController.list);
moviesRouter.get("/:id", MoviesController.get);
moviesRouter.put("/:id", MoviesController.update);
moviesRouter.delete("/:id", MoviesController.delete);

// -------- IMAGES --------
moviesRouter.post(
  "/:id/images",
  upload.single("file"),
  MoviesController.addImage
);

moviesRouter.put(
  "/images/:imageId",
  upload.single("file"),
  MoviesController.updateImage
);

moviesRouter.delete("/images/:imageId", MoviesController.deleteImage);
