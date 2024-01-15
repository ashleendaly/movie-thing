import { type Movie } from "./db";

export type MovieWithPreference = Movie & { preference: number };

export type SortableMovieList = (Movie & {
  preference: number;
} & {
  changed?: boolean;
})[];
