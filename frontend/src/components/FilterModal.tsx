import { useEffect, useState } from "react";
import Modal from "./common/Modal";
import InputField from "./ui/InputField";
import { MovieGenre, MovieGenreLabels } from "../config/genres";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    durationMin: string;
    durationMax: string;
    releaseDateFrom: string;
    releaseDateTo: string;
    genre: string
  }) => void;
  currentFilters: {
    durationMin?: number;
    durationMax?: number;
    releaseDateFrom?: string;
    releaseDateTo?: string;
    genre?: string;
  };
}

const FilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}: FilterModalProps) => {
  const [durationMin, setDurationMin] = useState(
    currentFilters.durationMin?.toString() || ""
  );
  const [durationMax, setDurationMax] = useState(
    currentFilters.durationMax?.toString() || ""
  );
  const [releaseDateFrom, setReleaseDateFrom] = useState(
    currentFilters.releaseDateFrom || ""
  );
  const [releaseDateTo, setReleaseDateTo] = useState(
    currentFilters.releaseDateTo || ""
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    currentFilters.genre || ""
  );

  useEffect(() => {
    if (isOpen) {
      setDurationMin(currentFilters.durationMin?.toString() || "");
      setDurationMax(currentFilters.durationMax?.toString() || "");
      setReleaseDateFrom(currentFilters.releaseDateFrom || "");
      setReleaseDateTo(currentFilters.releaseDateTo || "");
      setSelectedGenre(currentFilters.genre || "");
    }
  }, [isOpen, currentFilters]);

  const handleApplyClick = () => {
    onApplyFilters({
      durationMin,
      durationMax,
      releaseDateFrom,
      releaseDateTo,
      genre: selectedGenre,
    });
    onClose();
  };

  const handleCancelClick = () => onClose();

  return (
    <Modal isOpen={isOpen} onClose={handleCancelClick}>
      <h2 className="text-xl font-bold mb-6 text-white text-center">Filtros</h2>

      {/* Duração */}
      <div className="mb-6 flex flex-col items-center w-full max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-3 text-center w-full">
          Duração do Filme
        </h3>
        <div className="w-full flex flex-col gap-2">
          <InputField
            id="duration-min"
            label="Mínimo (minutos)"
            type="number"
            value={durationMin}
            placeholder="Ex: 90"
            onChange={setDurationMin}
          />
          <InputField
            id="duration-max"
            label="Máximo (minutos)"
            type="number"
            value={durationMax}
            placeholder="Ex: 180"
            onChange={setDurationMax}
          />
        </div>
      </div>

      {/* Data de Lançamento */}
      <div className="mb-6 flex flex-col items-center w-full max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-3 text-center w-full">
          Data de Lançamento
        </h3>
        <div className="w-full flex flex-col gap-2">
          <InputField
            id="date-from"
            label="De"
            type="date"
            value={releaseDateFrom}
            placeholder=""
            onChange={setReleaseDateFrom}
          />
          <InputField
            id="date-to"
            label="Até"
            type="date"
            value={releaseDateTo}
            placeholder=""
            onChange={setReleaseDateTo}
          />
        </div>
      </div>

      {/* Gênero (select único) */}
      <div className="mb-6 flex flex-col w-full max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-3 text-center w-full">
          Gênero
        </h3>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border rounded px-3 py-3 h-12 w-[342px] md:w-[380px] bg-input-background text-input-text"
        >
          <option value="">Todos</option>
          {Object.values(MovieGenre).map((genre) => (
            <option key={genre} value={genre}>
              {MovieGenreLabels[genre]}
            </option>
          ))}
        </select>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={handleCancelClick}
          className="bg-button-secondary-default text-white py-2 px-4 rounded hover:bg-buton-secondary-hover active:bg-button-secondary-active"
        >
          Cancelar
        </button>
        <button
          onClick={handleApplyClick}
          className="bg-button-primary-default text-white py-2 px-4 rounded hover:bg-button-primary-hover"
        >
          Aplicar Filtros
        </button>
      </div>
    </Modal>
  );
};

export default FilterModal;
