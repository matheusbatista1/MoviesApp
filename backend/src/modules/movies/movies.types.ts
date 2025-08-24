export interface IMovie {
  title: string;
  originalTitle?: string;
  description?: string;
  genres?: string;
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