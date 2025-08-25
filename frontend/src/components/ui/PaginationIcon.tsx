interface PaginationIconProps {
  direction: 'left' | 'right';
}

const PaginationIcon = ({ direction }: PaginationIconProps) => {
  const path = direction === 'left' 
    ? 'M15 6L9 12L15 18'
    : 'M9 6L15 12L9 18';

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='text-current'
    >
      <path
        d={path}
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
  );
};

export default PaginationIcon;
