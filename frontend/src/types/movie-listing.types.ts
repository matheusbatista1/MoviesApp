import type { Movie } from './movie.types';

export interface MovieFilters {
  durationMin?: number;
  durationMax?: number;
  releaseDateFrom?: string;
  releaseDateTo?: string;
  genres?: string[];
}

export interface MovieListingState {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  page: number;
  tmdbPage: number;
  totalPages: number;
  searchQuery: string;
}

export interface FilterState extends MovieFilters {
  isModalOpen: boolean;
}

export interface MovieListResponse {
  movies: Movie[];
  total: number;
  page: number;
  perPage: number;
}