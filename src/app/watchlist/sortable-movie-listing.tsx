"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { type MovieWithPreference } from "~/types";

export const SortableMovieListing = ({
  movie,
}: {
  movie: MovieWithPreference;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: movie.imdbID });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        {movie.title} - {movie.preference}
      </div>
    </div>
  );
};
