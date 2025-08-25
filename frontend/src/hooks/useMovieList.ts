import { useEffect, useState } from "react";
import type { MovieFilters } from "../types/movie-listing.types";
import { MovieService } from "../services/movie.service";
import { MovieGenre, MovieGenreLabels } from "../config/genres";
import type { Movie } from "../types/movie.types";

export const MOVIES_PER_PAGE = 10;

export function useMovieList(searchQuery: string, filters: MovieFilters) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);

      try {
        const filtersForBackend = {
          ...filters,
          genre:
            filters.genres && filters.genres.length > 0
              ? filters.genres[0]
              : undefined,
        };

        const response = await MovieService.fetchMovies(
          page,
          searchQuery,
          filtersForBackend
        );

        const moviesPT: Movie[] = response.movies.map((movie: Movie) => ({
          ...movie,
          genres: movie.genres.map(
            (g) => MovieGenreLabels[g as MovieGenre] || g
          ),
        }));

        setMovies(moviesPT);
        setTotalPages(
          Math.ceil(
            (response.total || 0) / (response.perPage || MOVIES_PER_PAGE)
          )
        );
      } catch (err) {
        setError(true);
        console.error("Erro ao buscar filmes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page, filters]);

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    setPage,
  };
}

export function useContainerWidth() {
  const [containerWidth, setContainerWidth] = useState(() =>
    window.innerWidth < 768 ? "100vw" : "calc(100vw - 80px)"
  );

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(
        window.innerWidth < 768 ? "100vw" : "calc(100vw - 80px)"
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return containerWidth;
}

export const useMovieFilters = () => {
  const [filters, setFilters] = useState<MovieFilters>({});
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyFilters = (newFilters: {
    durationMin: string;
    durationMax: string;
    releaseDateFrom: string;
    releaseDateTo: string;
    genres: string[];
  }) => {
    setSelectedGenreIds(newFilters.genres);

    setFilters({
      durationMin: newFilters.durationMin
        ? Number(newFilters.durationMin)
        : undefined,
      durationMax: newFilters.durationMax
        ? Number(newFilters.durationMax)
        : undefined,
      releaseDateFrom: newFilters.releaseDateFrom || undefined,
      releaseDateTo: newFilters.releaseDateTo || undefined,
      genres: newFilters.genres.length > 0 ? newFilters.genres : undefined,
    });

    setIsModalOpen(false);
  };

  return {
    filters,
    selectedGenreIds,
    isModalOpen,
    setIsModalOpen,
    handleApplyFilters,
  };
};
