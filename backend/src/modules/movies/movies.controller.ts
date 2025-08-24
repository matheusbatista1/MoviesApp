import { Request, Response } from "express";
import { MoviesService } from "./movies.service";
import { ImagesService } from "./movies.images.service";

export class MoviesController {
  static async create(req: Request, res: Response) {
    try {
      const movie = await MoviesService.create(req.body, req.userId!);
      res.status(201).json(movie);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao criar filme" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const movie = await MoviesService.update(
        Number(req.params.id),
        req.body,
        req.userId!
      );
      res.json(movie);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao atualizar filme" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.perPage as string) || 10;
      const result = await MoviesService.findAll(req.userId!, page, perPage);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao listar filmes" });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const movie = await MoviesService.findById(
        Number(req.params.id),
        req.userId!
      );
      res.json(movie);
    } catch (err: any) {
      res.status(404).json({ error: err.message || "Filme não encontrado" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await MoviesService.delete(
        Number(req.params.id),
        req.userId!
      );
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao deletar filme" });
    }
  }

  static async addImage(req: Request, res: Response) {
    try {
      const file = req.file as Express.MulterS3.File;
      const type = req.body.type as "banner" | "cover";

      if (!type || (type !== "banner" && type !== "cover")) {
        return res
          .status(400)
          .json({ error: "O tipo deve ser 'banner' ou 'cover'" });
      }

      const image = await ImagesService.addImage(
        Number(req.params.id),
        req.userId!,
        file.location,
        type
      );
      res.status(201).json(image);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao adicionar imagem" });
    }
  }

  static async updateImage(req: Request, res: Response) {
    try {
      const file = req.file as Express.MulterS3.File;

      const image = await ImagesService.updateImage(
        Number(req.params.imageId),
        req.userId!,
        file.location
      );
      res.json(image);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao atualizar imagem" });
    }
  }

  static async deleteImage(req: Request, res: Response) {
    try {
      const result = await ImagesService.deleteImage(
        Number(req.params.imageId),
        req.userId!
      );
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Erro ao deletar imagem" });
    }
  }
}