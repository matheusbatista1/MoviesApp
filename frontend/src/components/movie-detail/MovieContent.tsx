import type { Movie } from '../../types/movie-detail.types';
import { MovieGenreLabels, MovieGenre } from '../../config/genres';

interface MovieContentProps {
  movie: Movie;
}

export const MovieContent = ({ movie }: MovieContentProps) => {
  const infoBoxClass = 'bg-[#232225BF] backdrop-blur-sm p-4 rounded';

  const genreNames = Array.isArray(movie.genres) 
    ? movie.genres.map((genre: string) => MovieGenreLabels[genre as MovieGenre]).filter(Boolean)
    : [];

  return (
    <div className='flex-1'>
      <div className={`${infoBoxClass} mb-4 max-w-[1000px]`}>
        <h2 className='text-base text-text-footer font-bold mb-2'>
          SINOPSE
        </h2>
        <p>{movie.description || 'Sinopse não disponível.'}</p>
      </div>
      <div className={infoBoxClass}>
        <h2 className='font-montserrat font-bold text-[14px] mb-2'>
          Gêneros
        </h2>
        <div className='flex flex-wrap gap-2'>
          {genreNames.map(name => (
            <span
              key={name}
              className='bg-[#C150FF2E] text-text-button-secondary font-semibold text-[12px] uppercase px-5 py-2'
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};