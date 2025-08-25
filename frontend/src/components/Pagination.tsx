import type { FC } from 'react';
import PaginationButton from './ui/PaginationButton';
import PaginationIcon from './ui/PaginationIcon';
import { calculatePageRange } from '../utils/pagination.utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = calculatePageRange(currentPage, totalPages, maxVisiblePages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className='flex flex-wrap flex-row sm:flex-row items-center justify-center gap-2' aria-label='Paginação'>
      <PaginationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Página anterior'
      >
        <PaginationIcon direction='left' />
      </PaginationButton>

      {pageNumbers.map((number) => (
        <PaginationButton
          key={number}
          onClick={() => handlePageChange(number)}
          disabled={currentPage === number}
          active={currentPage === number}
          aria-current={currentPage === number ? 'page' : undefined}
          aria-label={`Página ${number}`}
        >
          {number}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Próxima página'
      >
        <PaginationIcon direction='right' />
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
