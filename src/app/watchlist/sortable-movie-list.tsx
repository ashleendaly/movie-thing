"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { type MovieWithPreference, type SortableMovieList } from "~/types";
import { SaveButton } from "./save-button";
import { SortableMovieListing } from "./sortable-movie-listing";
import { computeNewArr, sortMovies } from "./sortable-movie-utils";

export function SortableMovieList({
  initialMovies,
}: {
  initialMovies: MovieWithPreference[];
}) {
  const [movies, setMovies] = useState<SortableMovieList>(
    initialMovies.sort(sortMovies),
  );

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over) return;
    if (active.id === over.id) return;
    if (movies.length === 1) return movies;

    setMovies(computeNewArr(active.id, over.id, movies));
  }

  return (
    <>
      <SaveButton movies={movies} setMovies={setMovies} />
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          id="imdbID"
          items={movies.map((movie) => movie.imdbID)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="grid grid-cols-1 gap-10 p-5">
            {movies.map((movie) => (
              <SortableMovieListing key={movie.imdbID} movie={movie} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}
