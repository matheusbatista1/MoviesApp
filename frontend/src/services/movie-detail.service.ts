import axios from 'axios';
import type { Movie } from '../types/movie-detail.types';

const API_BASE_URL = 'http://localhost:3000/api'; 

interface MovieDetailsResponse {
  movie: Movie; 
  trailerKey: string | null;
}

export const movieDetailService = {
  async getMovieDetails(id: string): Promise<MovieDetailsResponse> {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/movies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const movieFromBackend = response.data;
      let trailerKey = null;

      if (movieFromBackend.trailerUrl) {
        try {
          const url = new URL(movieFromBackend.trailerUrl);
          trailerKey = url.searchParams.get('v');
        } catch (e) {
          console.error("URL do trailer inválida:", movieFromBackend.trailerUrl, e);
        }
      }
      
      return {
        movie: movieFromBackend,
        trailerKey
      };
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
      throw new Error("Não foi possível carregar os detalhes do filme. Verifique sua conexão ou tente novamente mais tarde.");
    }
  }
};