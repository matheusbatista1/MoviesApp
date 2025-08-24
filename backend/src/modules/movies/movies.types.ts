import { MovieGenre } from "@prisma/client";

export interface IMovie {
  title: string;
  originalTitle?: string;
  description?: string;
  genres?: MovieGenre[]; // agora é enum array
  popularity?: number;
  voteCount?: number;
  releaseDate: Date;
  duration: number;
  status?: string;
  language?: string;
  budget?: number;
  revenue?: number;
  profit?: number;
  voteAverage?: number;
  trailerUrl?: string;
}
