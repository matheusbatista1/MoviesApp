export interface MovieImage {
  id: number;
  url: string;
  type: "banner" | "cover";
  movieId: number;
}

export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  description?: string;
  genres?: string[];
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
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  images: {
    id: number;
    url: string;
    type: "banner" | "cover";
  }[];
}