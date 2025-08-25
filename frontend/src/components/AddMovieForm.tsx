import { useState } from "react";
import { GENRES } from "../config/genres";
import Modal from "./common/Modal";
import InputField from "./ui/InputField";
import { MovieService } from "../services/movie.service";
import type { AddMoviePayload } from "../types/movie.types";
import Button from "./ui/Button";

interface AddMovieFormProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Genre {
  id: number;
  name: string;
  value: string;
}

const initialState = {
  title: "",
  originalTitle: "",
  overview: "",
  genres: [] as number[],
  popularity: "",
  voteCount: "",
  releaseDate: "",
  runtime: "",
  originalLanguage: "",
  budget: "",
  revenue: "",
  profit: "",
  trailerUrl: "",
  voteAverage: "",
  popularityPercent: "",
  posterImage: null as File | null,
  bannerImage: null as File | null,
};

const AddMovieForm = ({ isOpen, onClose }: AddMovieFormProps) => {
  const [step, setStep] = useState<"info" | "image">("info");
  const [formData, setFormData] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genreId = Number(e.target.value);
    setFormData((prev) => {
      if (prev.genres.includes(genreId)) {
        return {
          ...prev,
          genres: prev.genres.filter((id) => id !== genreId),
        };
      }
      return {
        ...prev,
        genres: [...prev.genres, genreId],
      };
    });
  };

  const handleImageChange =
    (imageType: "poster" | "banner") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFormData((prev) => ({
          ...prev,
          [imageType === "poster" ? "posterImage" : "bannerImage"]:
            e.target.files![0],
        }));
      }
    };

  const handleCloseAndReset = () => {
    setFormData(initialState);
    setStep("info");
    onClose();
  };

  const handleSaveMovie = async () => {
    if (!formData.releaseDate) {
      console.error("Data de lançamento é obrigatória.");
      throw new Error("Data de lançamento é obrigatória.");
    }

    const today = new Date();
    const releaseDate = new Date(formData.releaseDate);
    const status = releaseDate <= today ? "released" : "upcoming";
    const revenue = Number(formData.revenue);
    const budget = Number(formData.budget);
    const profit = revenue && budget ? revenue - budget : 0;

    const moviePayload: AddMoviePayload = {
      title: formData.title,
      originalTitle: formData.originalTitle,
      description: formData.overview,
      genres: formData.genres.map(
        (id) => GENRES.find((g) => g.id === id)?.value || ""
      ),
      popularity: Number(formData.popularity),
      voteCount: Number(formData.voteCount),
      releaseDate: new Date(formData.releaseDate),
      duration: Number(formData.runtime),
      status: status,
      language: formData.originalLanguage,
      budget: budget,
      revenue: revenue,
      profit: profit,
      voteAverage: Number(formData.voteAverage),
      trailerUrl: formData.trailerUrl,
    };

    const createdMovie = await MovieService.addMovie(moviePayload);
    return createdMovie.id;
  };

  const handleSkipAndSave = async () => {
    setIsSaving(true);
    try {
      await handleSaveMovie();
      console.log("Filme salvo sem imagens!");
      handleCloseAndReset();
    } catch (err: unknown) { 
      console.error("Erro ao salvar filme:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitImages = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (!formData.posterImage || !formData.bannerImage) {
      console.error("Selecione ambas as imagens antes de finalizar.");
      setIsSaving(false);
      return;
    }

    try {
      const movieId = await handleSaveMovie();
      await MovieService.uploadImages(
        movieId,
        formData.posterImage,
        formData.bannerImage
      );

      console.log("Filme e imagens salvos!");
      handleCloseAndReset();
    } catch (err: unknown) {
      console.error("Erro ao salvar filme/imagens:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("image");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseAndReset} position="right">
      <div className="bg-form-background fixed right-0 top-0 bottom-0 md:w-[500px] w-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-form-background z-10 p-6 border-b border-button-primary-disable flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {step === "info" ? "Adicionar Filme" : "Imagens do Filme"}
          </h2>
          <button
            onClick={handleCloseAndReset}
            className="text-text-footer hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {step === "info" ? (
            <form onSubmit={handleNextStep} className="space-y-4 pb-20">
              <InputField
                id="title"
                label="Título"
                value={formData.title}
                onChange={handleInputChange("title")}
                placeholder="Digite o título do filme"
              />
              <InputField
                id="originalTitle"
                label="Título Original"
                value={formData.originalTitle}
                onChange={handleInputChange("originalTitle")}
                placeholder="Digite o título original"
              />
              <div className="flex flex-col">
                <label className="block text-input-label text-xs font-bold mb-2">
                  Sinopse
                </label>
                <textarea
                  value={formData.overview}
                  onChange={(e) =>
                    handleInputChange("overview")(e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full md:w-[380px] p-3 text-input-text placeholder-input-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background caret-button-primary-default border-input-outline-default focus:border-input-outline-focus"
                  rows={4}
                  placeholder="Digite a sinopse do filme"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-input-label text-xs font-bold mb-2">
                  Gêneros
                </label>
                <div className="shadow appearance-none border rounded w-full md:w-[380px] p-3 leading-tight focus:outline-none focus:shadow-outline bg-input-background border-input-outline-default focus:border-input-outline-focus overflow-y-auto max-h-48">
                  {GENRES.map((genre: Genre) => (
                    <div key={genre.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`genre-${genre.id}`}
                        value={genre.id}
                        checked={formData.genres.includes(genre.id)}
                        onChange={handleGenreChange}
                        className="form-checkbox h-4 w-4 text-button-primary-default"
                      />
                      <label
                        htmlFor={`genre-${genre.id}`}
                        className="text-input-text cursor-pointer"
                      >
                        {genre.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <InputField
                id="popularity"
                label="Popularidade"
                type="number"
                value={formData.popularity}
                onChange={handleInputChange("popularity")}
                placeholder="Digite a popularidade"
              />
              <InputField
                id="voteCount"
                label="Contagem de Votos"
                type="number"
                value={formData.voteCount}
                onChange={handleInputChange("voteCount")}
                placeholder="Digite a contagem de votos"
              />
              <InputField
                id="releaseDate"
                label="Data de Lançamento"
                type="date"
                value={formData.releaseDate}
                onChange={handleInputChange("releaseDate")}
                placeholder="Selecione a data"
                required
              />
              <InputField
                id="runtime"
                label="Duração (minutos)"
                type="number"
                value={formData.runtime}
                onChange={handleInputChange("runtime")}
                placeholder="Digite a duração em minutos"
              />
              <InputField
                id="originalLanguage"
                label="Idioma Original"
                value={formData.originalLanguage}
                onChange={handleInputChange("originalLanguage")}
                placeholder="Digite o idioma original"
              />
              <InputField
                id="budget"
                label="Orçamento ($)"
                type="number"
                value={formData.budget}
                onChange={handleInputChange("budget")}
                placeholder="Digite o orçamento"
              />
              <InputField
                id="revenue"
                label="Receita ($)"
                type="number"
                value={formData.revenue}
                onChange={handleInputChange("revenue")}
                placeholder="Digite a receita"
              />
              <InputField
                id="trailerUrl"
                label="Link do Trailer"
                value={formData.trailerUrl}
                onChange={handleInputChange("trailerUrl")}
                placeholder="Digite o link do trailer"
              />
              <InputField
                id="voteAverage"
                label="Nota Média"
                type="number"
                value={formData.voteAverage}
                onChange={handleInputChange("voteAverage")}
                placeholder="Digite a nota média (0-10)"
              />
              <InputField
                id="popularityPercent"
                label="Popularidade (%)"
                type="number"
                value={formData.popularityPercent}
                onChange={handleInputChange("popularityPercent")}
                placeholder="Digite a popularidade em porcentagem"
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Button onClick={handleCloseAndReset} variant="secondary">
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Salvar e Continuar
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitImages} className="space-y-4 pb-20">
              <div className="space-y-8">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Pôster do Filme
                  </h3>
                  <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-button-primary-disable rounded-lg bg-background-dark">
                    <input
                      type="file"
                      id="poster_image"
                      accept="image/*"
                      onChange={handleImageChange("poster")}
                      className="hidden"
                    />
                    <label
                      htmlFor="poster_image"
                      className="cursor-pointer flex flex-col items-center space-y-2 p-6"
                    >
                      {formData.posterImage ? (
                        <div className="relative group">
                          <img
                            src={URL.createObjectURL(formData.posterImage)}
                            alt="Preview"
                            className="w-48 h-72 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                            <span className="text-white text-sm">
                              Clique para trocar a imagem
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span className="text-gray-400 text-center">
                            Clique para adicionar o pôster do filme
                            <br />
                            <span className="text-sm text-gray-500">
                              Recomendado: 500x750 pixels
                            </span>
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Banner do Filme
                  </h3>
                  <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed border-button-primary-disable rounded-lg bg-background-dark">
                    <input
                      type="file"
                      id="banner_image"
                      accept="image/*"
                      onChange={handleImageChange("banner")}
                      className="hidden"
                    />
                    <label
                      htmlFor="banner_image"
                      className="cursor-pointer flex flex-col items-center space-y-2 p-6"
                    >
                      {formData.bannerImage ? (
                        <div className="relative group">
                          <img
                            src={URL.createObjectURL(formData.bannerImage)}
                            alt="Preview"
                            className="w-96 h-36 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                            <span className="text-white text-sm">
                              Clique para trocar a imagem
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span className="text-gray-400 text-center">
                            Clique para adicionar o banner do filme
                            <br />
                            <span className="text-sm text-gray-500">
                              Recomendado: 1920x1080 pixels
                            </span>
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button onClick={handleSkipAndSave} variant="secondary">
                    Pular
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSaving || !formData.posterImage || !formData.bannerImage} 
                  >
                    Finalizar
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddMovieForm;