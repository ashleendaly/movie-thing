"use client";
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
  closeDialog?: () => void;
}) {
  const { mutateAsync } = api.watchList.add.useMutation();
  return (
    // TODO: fix background of card, currently overflows
    <Card className="grid grid-cols-2 place-items-center gap-3 border-x-thick border-y-thick border-primary px-7 py-4">
      <CardHeader className="col-span-2 text-2xl text-foreground underline decoration-accent decoration-4 underline-offset-2">
        <CardTitle>Add to Watchlist?</CardTitle>
      </CardHeader>
      <MovieListing
        movie={movie}
        className="col-span-2 w-2/3 place-self-center rounded-sm"
      />

      <Button
        variant="constructive"
        className="w-full font-semibold"
        size="lg"
        onClick={() =>
          toast.promise(mutateAsync({ ...movie }).then(closeDialog), {
            loading: "loading",
            success: "Added movie to watchlist!",
            error: "Something went wrong",
          })
        }
      >
        yes
      </Button>
      <DialogClose asChild>
        <Button
          className="w-full font-semibold"
          type="button"
          variant="destructive"
          size="lg"
        >
          no
        </Button>
      </DialogClose>
    </Card>
  );
}
