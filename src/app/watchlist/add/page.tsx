"use client";
import { CircleDashed, Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { useOMDB } from "~/lib/hooks/use-omdb";
import { Movie } from "./movie";
import { Button } from "~/components/ui/button";

type SearchForm = {
  searchQuery: string;
};

export default function AddToWatchlist() {
  const { search, data: movies, status } = useOMDB();

  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit = handleSubmit((formData) => search(formData.searchQuery));

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-row gap-1 px-4">
        <Input {...register("searchQuery")} placeholder="Search..." />
        {/* TODO @pkitazos IDK how to get this search button to fit right with shadcn please advise */}
        <Button variant="accent" type="submit">
          <Search />
        </Button>
      </form>
      <ul className="grid grid-cols-2 gap-10 p-5">
        {status === "loading" && (
          <CircleDashed className="animate-spin-slow h-10 w-10 stroke-foreground" />
        )}
        {status === "success" &&
          movies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)}
      </ul>
    </>
  );
}
