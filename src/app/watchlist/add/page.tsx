"use client";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Spinner } from "~/components/ui/spinner";
import { useOMDB } from "~/lib/hooks/use-omdb";
import { AddableMovie } from "./addable-movie";

type SearchForm = {
  searchQuery: string;
};

export default function AddToWatchlist() {
  const { search, data: movies, status } = useOMDB();

  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit = handleSubmit((formData) => search(formData.searchQuery));

  return (
    <div className="bg-background">
      <form onSubmit={onSubmit} className="mt-4 flex h-16 flex-row gap-1 px-4">
        <Input
          {...register("searchQuery")}
          placeholder="Search..."
          className="text-foreground"
        />
        <Button variant="accent" type="submit">
          <Search />
        </Button>
      </form>

      <ScrollArea className="h-[calc(80dvh-4rem)]">
        {status === "loading" && (
          <div className="grid h-[calc(80dvh-4rem)] place-items-center">
            <Spinner />
          </div>
        )}
        <ul className="grid grid-cols-2 gap-10  p-5">
          {status === "success" &&
            movies.map((movie) => (
              <AddableMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
