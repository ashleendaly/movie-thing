"use client";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Spinner } from "~/components/ui/spinner";
import { useOMDB } from "~/lib/hooks/use-omdb";
import { AddableMovie } from "./addable-movie";

type SearchForm = { searchQuery: string };

export default function AddToWatchlist() {
  const { search, data: movies, status } = useOMDB();
  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit = handleSubmit((formData) => search(formData.searchQuery));

  return (
    <div className="bg-background">
      <form
        onSubmit={onSubmit}
        className="z-20 mb-1.5 grid w-full place-items-center px-4 py-6 shadow-md shadow-accent"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-row items-center justify-center gap-2.5">
          <Input
            {...register("searchQuery")}
            placeholder="Search..."
            className="text-base text-foreground"
          />
          <Button variant="accent" type="submit">
            <Search />
          </Button>
        </div>
      </form>

      {/* don't ask questions */}
      <ScrollArea className="z-10 h-[calc(100dvh-13.5rem+2px)]">
        {status === "loading" && (
          <div className="grid h-[calc(100dvh-22rem)] place-items-center">
            <Spinner />
          </div>
        )}
        <ul className="max-w-10xl mx-auto grid grid-cols-2 place-items-center gap-10 p-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {status === "success" &&
            movies.map((movie) => (
              <AddableMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
