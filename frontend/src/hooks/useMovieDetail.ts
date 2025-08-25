import { useState, useEffect } from "react";
import type { Movie } from "../types/movie.types";
import { MovieService } from "../services/movie.service";

export const useMovieDetail = (id: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedMovie = await MovieService.fetchMovieById(Number(id));

        const fullMovie: Movie = {
          ...fetchedMovie,
          genres: fetchedMovie.genres || [],
          createdAt: fetchedMovie.createdAt,
          updatedAt: fetchedMovie.updatedAt,
        };

        setMovie(fullMovie);
        setTrailerKey(fetchedMovie.trailerUrl ?? null);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error, setMovie, trailerKey };
};
