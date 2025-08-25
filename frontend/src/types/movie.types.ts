export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  description?: string;
  genres: string[];
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
  images: {
    id: number;
    url: string;
    type: "banner" | "cover";
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddMoviePayload {
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
}

export interface MovieUpdatePayload {
  title?: string;
  originalTitle?: string;
  description?: string;
  genres?: string[];
  popularity?: number;
  voteCount?: number;
  releaseDate?: Date;
  duration?: number;
  status?: string;
  language?: string;
  budget?: number;
  revenue?: number;
  profit?: number;
  voteAverage?: number;
  trailerUrl?: string;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface RatingCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}
