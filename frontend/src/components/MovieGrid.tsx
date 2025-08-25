import type { Movie } from '../types/movie.types';
import MovieCard from './ui/MovieCard';

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  if (!movies?.length) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Nenhum filme encontrado.
      </div>
    );
  }

  return (
    <div className="grid p-2 gap-4 md:gap-8 md:p-4 
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-5"
    >
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;