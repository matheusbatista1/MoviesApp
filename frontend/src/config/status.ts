export const MovieStatus = {
  RELEASED: "released",
  UPCOMING: "upcoming",
} as const;

export type MovieStatus = keyof typeof MovieStatus;

export const MovieStatusLabels: Record<MovieStatus, string> = {
  RELEASED: "Lançado",
  UPCOMING: "Em breve",
};