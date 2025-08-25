import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie-detail.types';
import Button from '../ui/Button';
import { MovieService } from '../../services/movie.service';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { MessageModal } from '../common/MessageModal';

interface MovieHeaderProps {
  movie: Movie;
  onEdit?: () => void;
}

export const MovieHeader = ({ movie, onEdit }: MovieHeaderProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState({ title: '', text: '' });
  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    setIsConfirmationModalOpen(false);
    setIsDeleting(true);

    try {
      if (movie.images && movie.images.length > 0) {
        const deleteImagePromises = movie.images.map(image =>
          MovieService.deleteImage(image.id)
        );
        
        await Promise.all(deleteImagePromises);
      }

      await MovieService.deleteMovie(movie.id);

      setMessage({
        title: 'Sucesso!',
        text: 'O filme foi deletado com sucesso.',
      });
      setIsMessageModalOpen(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao deletar o filme:', error);
      setMessage({
        title: 'Erro',
        text: 'Não foi possível deletar o filme ou suas imagens. Tente novamente mais tarde.',
      });
      setIsMessageModalOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className='relative flex items-start py-6 pb-12 w-full'>
        <div>
          <h1 className='text-3xl font-semibold'>{movie.title}</h1>
          <p className='text-lg mt-1'>
            Título original: {movie.originalTitle}
          </p>
        </div>
        <div className='absolute top-3 right-[-160px] flex gap-2'>
          <Button
            variant='secondary'
            className='w-24'
            onClick={() => setIsConfirmationModalOpen(true)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deletando...' : 'Deletar'}
          </Button>
          <Button
            variant='primary'
            className='w-24'
            onClick={onEdit}
          >
            Editar
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Você tem certeza que deseja deletar o filme "${movie.title}"? Esta ação é irreversível.`}
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={message.title}
        message={message.text}
      />
    </>
  );
};