import type { ButtonHTMLAttributes } from 'react';

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

const PaginationButton = ({ 
  active = false,
  children,
  className = '',
  ...props 
}: PaginationButtonProps) => {
  const baseStyles = 'px-3 py-1 sm:px-5 sm:py-2 rounded-sm flex items-center justify-center text-sm sm:text-base';
  const activeStyles = active
    ? 'text-[#EAE6FD6E] bg-button-secondary-disable'
    : 'text-white bg-button-primary-default hover:bg-button-primary-hover';
  const disabledStyles = 'disabled:text-[#EAE6FD6E] disabled:bg-button-secondary-disable';

  return (
    <button
      className={`${baseStyles} ${activeStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
