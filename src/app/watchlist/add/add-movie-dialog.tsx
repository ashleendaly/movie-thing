"use client";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { MovieListing } from "~/components/movie-listing";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { DialogClose } from "~/components/ui/dialog";
import { api } from "~/lib/trpc/react";
import { type Movie } from "~/types/db";

export function AddMovieDialog({
  movie,
  closeDialog,
}: {
  movie: Movie;
  closeDialog: () => void;
}) {
  const { mutateAsync } = api.watchList.add.useMutation();
  return (
    <Card className="grid grid-cols-2 place-items-center gap-3 border-x-thick border-y-thick border-primary px-7 py-4">
      <CardHeader className="col-span-2 text-2xl text-foreground underline decoration-accent decoration-4 underline-offset-2">
        <CardTitle>Add to Watchlist?</CardTitle>
      </CardHeader>
      <MovieListing
        className="col-span-2 w-2/3 place-self-center rounded-sm"
        movie={movie}
      />
      <Button
        className="flex w-full items-center gap-2 font-semibold"
        variant="accent"
        size="lg"
        onClick={() =>
          toast.promise(
            mutateAsync({ ...movie }).then((e) => {
              closeDialog();
              return e;
            }),
            {
              loading: "loading",
              success: (res) =>
                res
                  ? "Added movie to watchlist!"
                  : "Movie already in watchlist",
              error: "Something went wrong",
            },
          )
        }
      >
        <Check /> Yes
      </Button>
      <DialogClose asChild>
        <Button
          className="flex w-full items-center gap-2 font-semibold"
          variant="muted"
          type="button"
          size="lg"
        >
          <X /> No
        </Button>
      </DialogClose>
    </Card>
  );
}
