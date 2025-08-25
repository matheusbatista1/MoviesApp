import { api } from "./auth.service";
import type { Movie, AddMoviePayload, MovieUpdatePayload } from "../types/movie.types";
import type { MovieFilters } from "../types/movie-listing.types";

export const MovieService = {
  fetchMovies: async (page: number, search: string, filters: MovieFilters) => {
    const params: Record<string, string | number> = { page, perPage: 10 };

    if (search) params.search = search;

    if (filters.releaseDateFrom) params.releaseStart = filters.releaseDateFrom;
    if (filters.releaseDateTo) params.releaseEnd = filters.releaseDateTo;

    if (filters.durationMin !== undefined)
      params.minDuration = filters.durationMin;
    if (filters.durationMax !== undefined)
      params.maxDuration = filters.durationMax;

    if (filters.genres && filters.genres.length > 0) {
      params.genre = filters.genres.join(",");
    }

    const response = await api.get("/movies", { params });
    return response.data;
  },

  async fetchMovieById(movieId: number): Promise<Movie> {
    const response = await api.get<Movie>(`/movies/${movieId}`);
    return response.data;
  },

  addMovie: async (movieData: AddMoviePayload) => {
    const response = await api.post("/movies", movieData);
    return response.data;
  },

  uploadImages: async (movieId: number, poster: File, banner: File) => {
    const posterFormData = new FormData();
    posterFormData.append("file", poster);
    posterFormData.append("type", "cover");

    const posterPromise = api.post(
      `/movies/${movieId}/images`,
      posterFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const bannerFormData = new FormData();
    bannerFormData.append("file", banner);
    bannerFormData.append("type", "banner");

    const bannerPromise = api.post(
      `/movies/${movieId}/images`,
      bannerFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    await Promise.all([posterPromise, bannerPromise]);
  },

  deleteMovie: async (movieId: number): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado. Por favor, faça login.");
      }

      await api.delete(`/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Falha ao deletar o filme:", error);
      throw error;
    }
  },

  deleteImage: async (imageId: number): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado. Por favor, faça login.");
      }

      await api.delete(`/movies/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Falha ao deletar a imagem:", error);
      throw error;
    }
  },

  updateMovie: async (
    movieId: number,
    movieData: MovieUpdatePayload
  ): Promise<Movie> => {
    const response = await api.put<Movie>(`/movies/${movieId}`, movieData);
    return response.data;
  },
};