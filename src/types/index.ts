import { type Movie } from "./db";

export type SortableMovie = Movie & { preference: number; changed?: boolean };
