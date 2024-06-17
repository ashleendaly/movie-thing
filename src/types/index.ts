import { type Movie } from "./db";

export type SortableMovie = Movie & { preference: number; changed?: boolean };

export type ClubMember = {
  id: string;
  username: string;
  imageUrl: string;
  isPresent: boolean;
};
