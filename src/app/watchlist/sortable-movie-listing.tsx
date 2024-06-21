"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ScanEye } from "lucide-react";
import { MovieListing } from "~/components/movie-listing";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { type SortableMovie } from "~/types";

export const SortableMovieListing = ({ movie }: { movie: SortableMovie }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: movie.imdbID });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-10/12 flex-row items-center justify-between rounded-md border-[3px] border-secondary px-3 py-2"
    >
      <Button
        {...attributes}
        {...listeners}
        size="sm"
        variant="ghost"
        className="touch-none text-accent active:text-accent-foreground"
      >
        <GripVertical />
      </Button>
      <div className="w-full pl-4 text-start">{movie.title}</div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="block text-accent lg:hidden"
          >
            <ScanEye />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="grid place-items-center p-7">
            <MovieListing movie={movie} />
          </div>
        </DrawerContent>
      </Drawer>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="hidden text-accent lg:block"
          >
            <ScanEye />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Card>
            <div className="grid place-items-center p-7">
              <MovieListing movie={movie} />
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
