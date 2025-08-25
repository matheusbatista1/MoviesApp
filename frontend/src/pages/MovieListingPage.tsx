import { useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination.tsx";
import FilterModal from "../components/FilterModal";
import AddMovieForm from "../components/AddMovieForm";
import {
  useMovieList,
  useContainerWidth,
  useMovieFilters,
} from "../hooks/useMovieList";

const MovieListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const { filters, isModalOpen, setIsModalOpen, handleApplyFilters } =
    useMovieFilters();
  const containerWidth = useContainerWidth();
  const { movies, loading, error, page, totalPages, setPage } = useMovieList(
    searchQuery,
    filters
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-background-dark text-white">
          <p>Carregando filmes...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-background-dark text-white">
          <p>
            Ocorreu um erro ao carregar os filmes. Por favor, tente novamente
            mais tarde.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen text-white">
        <main className="flex flex-col items-center justify-center pt-6 flex-1">
          <div
            className="container-movies flex items-center justify-center w-full mb-6"
            style={{
              width: containerWidth,
              maxWidth: "100%",
              minHeight: 0,
              padding: 18,
              boxSizing: "border-box",
            }}
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onFilterClick={() => setIsModalOpen(true)}
              onAddMovieClick={() => setIsAddMovieModalOpen(true)}
            />
          </div>
          <div
            className="container-movies flex items-center justify-center w-full"
            style={{
              width: containerWidth,
              maxWidth: "100%",
              minHeight: 400,
              padding: 18,
              background: "#EBEAF814",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              boxSizing: "border-box",
            }}
          >
            <div className="w-full">
              <MovieGrid movies={movies} />
            </div>
          </div>
        </main>
        <div className="flex justify-center p-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
          <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApplyFilters={handleApplyFilters}
            currentFilters={filters}
          />
          <AddMovieForm
            isOpen={isAddMovieModalOpen}
            onClose={() => setIsAddMovieModalOpen(false)}
          />
        </div>
      </div>
    );
  };

  return renderContent();
};

export default MovieListingPage;
