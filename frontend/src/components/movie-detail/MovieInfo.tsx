import type { Movie } from "../../types/movie-detail.types";
import { RatingCircle } from "../ui/RatingCircle";
import { MovieStatusLabels, MovieStatus } from "../../config/status";

interface MovieInfoProps {
  movie: Movie;
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  const formattedRuntime = movie.duration
    ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m`
    : "N/A";
  const formattedRevenue =
    (movie.revenue ?? 0) > 0
      ? `$${((movie.revenue as number) / 1000000).toFixed(2)}M`
      : "N/A";
  const formattedBudget =
    (movie.budget ?? 0) > 0
      ? `$${((movie.budget as number) / 1000000).toFixed(2)}M`
      : "N/A";
  const formattedProfit =
    (movie.revenue ?? 0) > 0 && (movie.budget ?? 0) > 0
      ? `$${(
          ((movie.revenue as number) - (movie.budget as number)) /
          1000000
        ).toFixed(2)}M`
      : "N/A";

  const translatedStatus = movie.status
    ? MovieStatusLabels[movie.status.toUpperCase() as MovieStatus] || "N/A"
    : "N/A";

  const infoBoxClass = "bg-[#232225BF] backdrop-blur-sm p-4 rounded";
  const infoLabelClass =
    "text-xs font-bold text-text-footer uppercase tracking-wider mb-2";
  const infoValueClass = "text-sm font-bold text-input-text";

  return (
    <div className="w-[250px] flex-shrink-0 ml-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-start">
          <div
            className={
              infoBoxClass +
              " flex-1 text-center h-14 flex flex-col items-center justify-center"
            }
          >
            <p className={infoLabelClass}>Popularidade</p>
            <p className={infoValueClass}>
              {movie.popularity?.toFixed(0) || "N/A"}
            </p>{" "}
            {/* Corrected here */}
          </div>
          <div
            className={
              infoBoxClass +
              " flex-1 text-center min-w-[140px] h-14 flex flex-col items-center justify-center"
            }
          >
            <p className={infoLabelClass}>Votos</p>
            <p className={infoValueClass}>{movie.voteCount || "N/A"}</p>{" "}
            {/* Corrected here */}
          </div>
          <div className="flex-none flex items-center">
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                width: 100,
                height: 100,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Added check for voteAverage and default to 0 to prevent issues */}
              <RatingCircle value={movie.voteAverage || 0} size={100} />{" "}
              {/* Corrected here */}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className={infoBoxClass + " flex-1 text-center min-w-[200px]"}>
            <p className={infoLabelClass}>Lançamento</p>
            <p className={infoValueClass}>
              {/* Added check for releaseDate */}
              {movie.releaseDate
                ? new Date(movie.releaseDate).toLocaleDateString()
                : "N/A"}{" "}
              {/* Corrected here */}
            </p>
          </div>
          <div className={infoBoxClass + " flex-1 text-center min-w-[200px]"}>
            <p className={infoLabelClass}>Duração</p>
            <p className={infoValueClass}>{formattedRuntime}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className={infoBoxClass + " flex-1 text-center min-w-[200px]"}>
            <p className={infoLabelClass}>Situação</p>
            <p className={infoValueClass}>{translatedStatus}</p>{" "}
            {}
          </div>
          <div className={infoBoxClass + " flex-1 text-center min-w-[200px]"}>
            <p className={infoLabelClass}>Idioma</p>
            <p className={infoValueClass}>
              {}
              {movie.language?.toUpperCase() || "N/A"} {}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className={infoBoxClass + " flex-1 text-center min-w-[128px]"}>
            <p className={infoLabelClass}>Orçamento</p>
            <p className={infoValueClass}>{formattedBudget}</p>
          </div>
          <div className={infoBoxClass + " flex-1 text-center min-w-[128px]"}>
            <p className={infoLabelClass}>Receita</p>
            <p className={infoValueClass}>{formattedRevenue}</p>
          </div>
          <div className={infoBoxClass + " flex-1 text-center min-w-[128px]"}>
            <p className={infoLabelClass}>Lucro</p>
            <p className={infoValueClass}>{formattedProfit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
