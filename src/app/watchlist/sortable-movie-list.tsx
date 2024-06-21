"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { SaveButton } from "./save-button";
import { SortableMovieListing } from "./sortable-movie-listing";
import { computeNewArr, sortMovies } from "./sortable-movie-utils";
import { type SortableMovie } from "~/types";
import { ScrollArea } from "~/components/ui/scroll-area";

export function SortableMovieList({
  initialMovies,
}: {
  initialMovies: SortableMovie[];
}) {
  const [movies, setMovies] = useState<SortableMovie[]>(
    initialMovies.sort(sortMovies),
  );

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over) return;
    if (active.id === over.id) return;
    if (movies.length === 1) return movies;

    setMovies(computeNewArr(active.id, over.id, movies));
  }

  return (
    <ScrollArea className="h-[calc(100dvh-7rem)]">
      <SaveButton movies={movies} setMovies={setMovies} />
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          id="imdbID"
          items={movies.map((movie) => movie.imdbID)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="grid w-full grid-cols-1 place-items-center gap-5 p-5">
            {movies.map((movie) => (
              <SortableMovieListing key={movie.imdbID} movie={movie} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </ScrollArea>
  );
}
