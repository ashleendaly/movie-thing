"use client";
import { useState } from "react";
import { MovieListing } from "~/components/movie-listing";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { type Movie } from "~/types/db";
import { AddMovieDialog } from "./add-movie-dialog";

export const AddableMovie = ({ movie }: { movie: Movie }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <MovieListing movie={movie} />
        </button>
      </DialogTrigger>
      <DialogContent className=" rounded-md border-none bg-red-600 outline-none">
        <AddMovieDialog movie={movie} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
