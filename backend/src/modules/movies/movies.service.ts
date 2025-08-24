import { PrismaClient } from "@prisma/client";
import { IMovie } from "./movies.types";

const prisma = new PrismaClient();

export class MoviesService {
  static async create(movieData: IMovie, userId: number) {
    const movie = await prisma.movie.create({
      data: { ...movieData, userId },
    });

    if (movie.releaseDate > new Date()) {
      await prisma.releaseEmailSchedule.create({
        data: { movieId: movie.id, sendAt: movie.releaseDate },
      });
    }

    return movie;
  }

  static async update(id: number, data: IMovie, userId: number) {
    const movie = await prisma.movie.findFirst({ where: { id, userId } });
    if (!movie) throw new Error("Filme não encontrado");

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data,
    });

    if (updatedMovie.releaseDate > new Date()) {
      const existingSchedule = await prisma.releaseEmailSchedule.findFirst({
        where: { movieId: id },
      });

      if (existingSchedule) {
        await prisma.releaseEmailSchedule.update({
          where: { id: existingSchedule.id },
          data: { sendAt: updatedMovie.releaseDate, sent: false },
        });
      } else {
        await prisma.releaseEmailSchedule.create({
          data: { movieId: updatedMovie.id, sendAt: updatedMovie.releaseDate },
        });
      }
    }

    return updatedMovie;
  }

  static async findAll(userId: number, page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    const movies = await prisma.movie.findMany({
      where: { userId },
      skip,
      take: perPage,
      include: { images: true },
    });
    const total = await prisma.movie.count({ where: { userId } });
    return { movies, total, page, perPage };
  }

  static async findById(id: number, userId: number) {
    const movie = await prisma.movie.findFirst({
      where: { id, userId },
      include: { images: true },
    });
    if (!movie) throw new Error("Filme não encontrado");
    return movie;
  }

  static async delete(id: number, userId: number) {
    const movie = await prisma.movie.findFirst({ where: { id, userId } });
    if (!movie) throw new Error("Filme não encontrado");

    await prisma.movie.delete({ where: { id } });
    return { message: "Filme deletado com sucesso" };
  }
}