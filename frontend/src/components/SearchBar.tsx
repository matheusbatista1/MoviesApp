import type { ChangeEvent } from 'react';
import { useRef, useEffect } from 'react';
import Button from './ui/Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
  onAddMovieClick: () => void;
}

export default function SearchBar({ value, onChange, onFilterClick, onAddMovieClick }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-end w-full">
      <div className="relative w-full md:w-[342px] lg:w-[380px]">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Pesquise por filmes"
          className="shadow appearance-none border rounded w-full h-[44px] px-3 pr-10 text-input-text placeholder-input-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background caret-button-primary-default border-input-outline-default focus:border-input-outline-focus"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-3 top-[10px]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18ZM11 6C10.3434 6 9.69321 6.12933 9.08658 6.3806C8.47995 6.63188 7.92876 7.00017 7.46447 7.46447C7.00017 7.92876 6.63188 8.47996 6.3806 9.08658C6.12933 9.69321 6 10.3434 6 11C6 11.5523 6.44772 12 7 12C7.55228 12 8 11.5523 8 11C8 10.606 8.0776 10.2159 8.22836 9.85195C8.37913 9.48797 8.6001 9.15726 8.87868 8.87868C9.15726 8.6001 9.48797 8.37913 9.85195 8.22836C10.2159 8.0776 10.606 8 11 8C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6Z"
            fill="#B5B2BC"
          />
          <path d="M20 20L18 18" stroke="#B5B2BC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <Button variant="secondary" className="w-full md:w-auto" onClick={onFilterClick}>Filtros</Button>
      <Button className="w-full md:w-auto" onClick={onAddMovieClick}>Adicionar filme</Button>
    </div>
  );
}


