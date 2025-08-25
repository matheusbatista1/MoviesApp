import type { MovieCardProps } from "../../types/movie.types";
import { MovieGenreLabels, MovieGenre } from "../../config/genres";
import { RatingCircle } from "./RatingCircle";
import { useResponsiveRatingSize } from "../../utils/useResponsiveRatingSize";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl =
    movie.images.find((img) => img.type === "cover")?.url ||
    "/images/fallback.png";

  const ratingSize = useResponsiveRatingSize();

  return (
    <Link to={`/filme/${movie.id}`} className="block">
      <div className="relative w-full rounded-sm overflow-hidden shadow-lg transition-transform transform hover:scale-105 group">
        <div className="relative w-full pb-[180%] sm:aspect-[2/3] sm:pb-[150%] md:pb-[150%]">
          <img
            src={imageUrl}
            alt={`Poster do filme ${movie.title}`}
            className="absolute inset-0 w-full h-full object-cover rounded-sm
              sm:w-full sm:h-full sm:rounded-sm
              md:w-full md:h-full md:rounded-sm"
            loading="lazy"
          />

          <div className="absolute bottom-0 w-full h-1/2 bg-poster-gradient" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                width: ratingSize,
                height: ratingSize,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RatingCircle value={movie.voteAverage ?? 0} size={ratingSize} />
            </div>
          </div>

          <div className="absolute bottom-0 w-full text-white px-3 pb-2 z-10 transition-transform duration-300 group-hover:translate-y-[-16px]">
            <h3 className="font-semibold break-words whitespace-normal tracking-wider font-montserrat uppercase text-[14px] group-hover:text-white transition-colors duration-300">
              {movie.title}
            </h3>
            <div
              className="font-montserrat text-[#B4B4B4] text-[12px] font-normal mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ lineHeight: "1.2" }}
            >
              {Array.isArray(movie.genres) && movie.genres.length > 0
                ? movie.genres
                    .map((g) => MovieGenreLabels[g as MovieGenre] || g)
                    .sort((a, b) => a.localeCompare(b, "pt-BR"))
                    .join(", ")
                : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
