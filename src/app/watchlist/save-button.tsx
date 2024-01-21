"use client";

import { type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";
import { type SortableMovie } from "~/types";

export function SaveButton({
  movies,
  setMovies,
}: {
  movies: SortableMovie[];
  setMovies: Dispatch<SetStateAction<SortableMovie[]>>;
}) {
  const { mutateAsync } = api.watchList.reorder.useMutation();

  return (
    <Button
      disabled={!movies.some(({ changed }) => changed)}
      onClick={() =>
        toast.promise(
          mutateAsync({
            changes: movies
              .filter((e) => e.changed)
              .map((e) => ({
                movieID: e.imdbID,
                newPreference: e.preference,
              })),
          }).then(() =>
            setMovies((movies) =>
              movies.map((e) => ({ ...e, changed: false })),
            ),
          ),
          {
            loading: "Saving...",
            success: "Saved!",
            error: "Something went wrong...",
          },
        )
      }
    >
      Save
    </Button>
  );
}
