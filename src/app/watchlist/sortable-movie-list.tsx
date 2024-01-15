"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

import { type SortableMovieList, type MovieWithPreference } from "~/types";
import { SaveButton } from "./save-button";
import { SortableMovieListing } from "./sortable-movie-listing";
import { computePreference, sortMovies } from "./sortable-movie-utils";

export function SortableMovieList({
  initialMovies,
}: {
  initialMovies: MovieWithPreference[];
}) {
  const [movies, setMovies] = useState<SortableMovieList>(initialMovies);

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over) return;
    if (active.id === over.id) return;

    setMovies((movies) => {
      if (movies.length === 1) return movies;

      const oldIndex = movies.findIndex((movie) => movie.imdbID === active.id);

      const newPreference = computePreference(active.id, over.id, movies);

      movies[oldIndex] = {
        ...movies[oldIndex]!,
        changed: true,
        preference: newPreference,
      };

      return movies;
    });
  }

  return (
    <>
      <SaveButton movies={movies} setMovies={setMovies} />
      <ScrollArea className="h-[80dvh]">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            id="imdbID"
            items={movies.sort(sortMovies).map((movie) => movie.imdbID)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="grid grid-cols-1 gap-10 p-5">
              {movies.sort(sortMovies).map((movie) => (
                <SortableMovieListing key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </ScrollArea>
    </>
  );
}
