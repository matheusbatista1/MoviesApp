import { PrismaClient } from "@prisma/client";
import { deleteImageFromS3 } from "./movies.s3";

const prisma = new PrismaClient();

export class ImagesService {
  static async addImage(
    movieId: number,
    userId: number,
    url: string,
    type: "banner" | "cover"
  ) {
    const movie = await prisma.movie.findFirst({
      where: { id: movieId, userId },
      include: { images: true },
    });
    if (!movie) throw new Error("Filme não encontrado");

    const existing = movie.images.find((img: { type: string }) => img.type === type);
    if (existing) {
      await deleteImageFromS3(existing.url);
      await prisma.movieImage.delete({ where: { id: existing.id } });
    }

    return prisma.movieImage.create({
      data: { movieId, url, type },
    });
  }

  static async updateImage(
    imageId: number,
    userId: number,
    url: string
  ) {
    const image = await prisma.movieImage.findFirst({
      where: { id: imageId, movie: { userId } },
      include: { movie: true },
    });
    if (!image) throw new Error("Imagem não encontrada");

    await deleteImageFromS3(image.url);

    return prisma.movieImage.update({
      where: { id: imageId },
      data: { url },
    });
  }

  static async deleteImage(imageId: number, userId: number) {
    const image = await prisma.movieImage.findFirst({
      where: { id: imageId, movie: { userId } },
    });
    if (!image) throw new Error("Imagem não encontrada");

    await deleteImageFromS3(image.url);

    await prisma.movieImage.delete({ where: { id: imageId } });
    return { message: "Imagem deletada com sucesso" };
  }
}