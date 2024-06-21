"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";
import { cn } from "~/lib/utils/cn";
import { type SortableMovie } from "~/types";

export function SaveButton({
  movies,
  setMovies,
}: {
  movies: SortableMovie[];
  setMovies: Dispatch<SetStateAction<SortableMovie[]>>;
}) {
  const { mutateAsync } = api.watchList.reorder.useMutation();

  const [stuck, setStuck] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([e]) => setStuck(e!.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(container);
    return () => observer.unobserve(container);
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="sticky top-[-1px] z-20 grid w-full place-items-center bg-background px-4 pt-6"
    >
      <Button
        className={cn(
          "w-full bg-accent transition-all",
          stuck && "w-11/12 shadow-md shadow-secondary",
        )}
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
        {movies.some(({ changed }) => changed)
          ? "Save"
          : "No preferences changed"}
      </Button>
    </div>
  );
}
