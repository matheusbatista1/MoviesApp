export const MovieGenre = {
  ACTION: "ACTION",
  ADVENTURE: "ADVENTURE",
  ANIMATION: "ANIMATION",
  COMEDY: "COMEDY",
  CRIME: "CRIME",
  DOCUMENTARY: "DOCUMENTARY",
  DRAMA: "DRAMA",
  FAMILY: "FAMILY",
  FANTASY: "FANTASY",
  HISTORY: "HISTORY",
  HORROR: "HORROR",
  MUSIC: "MUSIC",
  MYSTERY: "MYSTERY",
  ROMANCE: "ROMANCE",
  SCIENCE_FICTION: "SCIENCE_FICTION",
  TV_MOVIE: "TV_MOVIE",
  THRILLER: "THRILLER",
  WAR: "WAR",
  WESTERN: "WESTERN",
} as const;

export type MovieGenre = keyof typeof MovieGenre;

export const MovieGenreLabels: Record<MovieGenre, string> = {
  ACTION: "Ação",
  ADVENTURE: "Aventura",
  ANIMATION: "Animação",
  COMEDY: "Comédia",
  CRIME: "Crime",
  DOCUMENTARY: "Documentário",
  DRAMA: "Drama",
  FAMILY: "Família",
  FANTASY: "Fantasia",
  HISTORY: "História",
  HORROR: "Terror",
  MUSIC: "Música",
  MYSTERY: "Mistério",
  ROMANCE: "Romance",
  SCIENCE_FICTION: "Ficção Científica",
  TV_MOVIE: "Filme para TV",
  THRILLER: "Suspense",
  WAR: "Guerra",
  WESTERN: "Faroeste",
};

export const GenreNameToEnum: Record<string, MovieGenre> = Object.entries(MovieGenreLabels).reduce(
  (acc, [key, value]) => {
    acc[value] = key as MovieGenre;
    return acc;
  },
  {} as Record<string, MovieGenre>
);

export const GENRES = Object.entries(MovieGenreLabels).map(([value, label], index) => ({
  id: index + 1,
  value,
  name: label,
}));