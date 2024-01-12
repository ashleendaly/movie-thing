import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { env } from "~/env";

export interface MovieResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search: MovieResponse[];
}

export function useOMDB() {
  const { mutate: search, ...rest } = useMutation({
    mutationFn: async (searchQuery: string) => {
      const { Search: searchResult } = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${env.NEXT_PUBLIC_OMDB_KEY}&s=${searchQuery}`,
        { method: "GET" },
      ).then((res) => res.json() as Promise<SearchResponse>);

      return searchResult.filter((movie) => movie.Type === "movie") ?? [];
    },
    onSuccess: (result) => {
      if (result.length === 0) toast.error("No movies found");
    },
    onError: () => toast.error("Something went wrong"),
  });
  return { search, ...rest };
}
