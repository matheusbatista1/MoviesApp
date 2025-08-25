import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const base =
  'h-[44px] px-4 rounded-sm font-medium transition-colors duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-button-primary-default hover:bg-button-primary-hover active:bg-button-primary-active disabled:bg-button-primary-disable text-text-button-primary',
  secondary:
    'bg-button-secondary-default hover:bg-button-secondary-hover active:bg-button-secondary-active disabled:bg-button-secondary-disable text-text-button-secondary',
};

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
