import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { env } from "~/env";
import { type Movie } from "~/types/db";

export interface MovieResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search?: MovieResponse[];
}

export const transformMovie = ({
  Poster,
  Title,
  imdbID,
}: MovieResponse): Movie => ({ posterURL: Poster, title: Title, imdbID });

export function useOMDB() {
  const { mutate: search, ...rest } = useMutation({
    mutationFn: async (searchQuery: string) => {
      const { Search: searchResult } = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=${env.NEXT_PUBLIC_OMDB_KEY}&s=${searchQuery}`,
        { method: "GET" },
      ).then((res) => res.json() as Promise<SearchResponse>);

      return (
        searchResult
          ?.filter((movie) => movie.Type === "movie")
          .map(transformMovie) ?? []
      );
    },
    onSuccess: (result) => {
      if (result.length === 0) toast.error("No movies found");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Something went wrong");
    },
  });
  return { search, ...rest };
}
