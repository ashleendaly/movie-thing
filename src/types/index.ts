import { type Movie } from "./db";
import { type User } from "@clerk/nextjs/server";

export type SortableMovie = Movie & { preference: number; changed?: boolean };

export type ClubMember = { user: User; isPresent: boolean };
