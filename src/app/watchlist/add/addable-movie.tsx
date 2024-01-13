"use client";
import { useState } from "react";
import { toast } from "sonner";
import { MovieListing } from "~/components/movie-listing";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/lib/trpc/react";
import { type Movie } from "~/types/db";

export const AddableMovie = ({ movie }: { movie: Movie }) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync } = api.watchList.add.useMutation();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-16 w-full" size="lg">
          <MovieListing movie={movie} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[70dvh]">
        <div className="grid">
          <div>Add to watchlist?</div>
          <Button
            variant="accent"
            onClick={() =>
              toast.promise(
                mutateAsync({ ...movie }).then(() => setOpen(false)),
                {
                  loading: "loading",
                  success: "Added movie to watchlist!",
                  error: "Something went wrong",
                },
              )
            }
          >
            yes
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              no
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
