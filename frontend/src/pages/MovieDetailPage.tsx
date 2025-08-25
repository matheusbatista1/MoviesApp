import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMovieDetail } from '../hooks/useMovieDetail';
import EditMovieForm from '../components/EditMovieForm';
import type { Movie } from '../types/movie.types';
import { MovieHeader } from '../components/movie-detail/MovieHeader';
import { MovieContent } from '../components/movie-detail/MovieContent';
import { MovieInfo } from '../components/movie-detail/MovieInfo';
import { MovieTrailer } from '../components/movie-detail/MovieTrailer';

const LoadingState = () => (
  <div className='flex justify-center items-center min-h-screen bg-background-dark text-white'>
    <p>Carregando detalhes do filme...</p>
  </div>
);

const ErrorState = () => (
  <div className='flex justify-center items-center min-h-screen bg-background-dark text-white'>
    <p>
      Ocorreu um erro ao carregar os detalhes do filme. Por favor, tente
      novamente mais tarde.
    </p>
  </div>
);

const NotFoundState = () => (
  <div className='flex justify-center items-center min-h-screen bg-background-dark text-white'>
    <p>Filme não encontrado.</p>
  </div>
);

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error, setMovie, trailerKey } = useMovieDetail(id);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSave = (updatedMovie: Movie) => {
    setMovie(updatedMovie);
    setIsEditOpen(false);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!movie) return <NotFoundState />;

  const posterUrl = movie.images.find((img) => img.type === "cover")?.url;
  const bannerUrl = movie.images.find((img) => img.type === "banner")?.url;

  return (
    <div className='flex flex-col min-h-screen bg-background-dark overflow-x-hidden text-input-text font-montserrat'>
      <main className='flex-1 w-full px-4 py-20'>
        <div className='relative overflow-hidden min-h-[600px]'>
          <div
            className='relative z-10 max-w-[1800px] mx-auto w-full px-6 py-8'
            style={{
              backgroundImage: `linear-gradient(90deg, #121113 0%, rgba(18,17,19,0.8) 50%, rgba(18,17,19,0) 100%), url(${bannerUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='max-w-[1200px] mx-auto w-full'>
              <MovieHeader movie={movie} onEdit={() => setIsEditOpen(true)} />

              <EditMovieForm isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} movie={movie} onSave={handleSave} />
              
              <div className='md:flex md:items-start md:gap-8'>
                <div className='md:w-[500px] flex-shrink-0'>
                  <img
                    src={posterUrl}
                    alt={`Pôster do filme ${movie.title}`}
                    className='w-full rounded-sm shadow-lg md:h-[700px] object-cover'
                  />
                </div>

                <MovieContent movie={movie} />
                <MovieInfo movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className='max-w-[1200px] mx-auto w-full my-8'>
        { trailerKey && <MovieTrailer trailerKey={trailerKey} /> }
      </div>
    </div>
  );
};

export default MovieDetailPage;