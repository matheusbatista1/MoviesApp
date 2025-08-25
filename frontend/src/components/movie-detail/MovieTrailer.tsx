interface MovieTrailerProps {
  trailerKey: string | null;
}

export const MovieTrailer = ({ trailerKey }: MovieTrailerProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <h2 className="text-xl font-bold mb-8">Trailer</h2>
      {trailerKey ? (
        <div className="relative w-full aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="text-center py-10">Trailer não disponível.</div>
      )}
    </div>
  );
};
