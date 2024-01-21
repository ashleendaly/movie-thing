import { type UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type SortableMovie } from "~/types";

// * NB this may be backwards
/***
 * sorts two movies by their preference
 * @usage `sortedMovies = movies.sort(sortMovies)`
 */
export function sortMovies(a: SortableMovie, b: SortableMovie) {
  return a.preference - b.preference;
}

/***
 * ? assume there are at least 2 elements in movies
 */
export function computeNewArr(
  activeID: UniqueIdentifier,
  overID: UniqueIdentifier,
  movies: SortableMovie[],
): SortableMovie[] {
  const oldIndex = movies.findIndex((movie) => movie.imdbID === activeID);
  const newIndex = movies.findIndex((movie) => movie.imdbID === overID);

  const arr = arrayMove(movies, oldIndex, newIndex);

  const targetIndex = arr.findIndex((movie) => movie.imdbID === activeID);

  const prevPref = arr[targetIndex - 1]?.preference ?? 0;
  const nextPref =
    arr[targetIndex + 1]?.preference ??
    Math.max(...arr.map((e) => e.preference)) + 1;

  const newPref = (prevPref + nextPref) / 2;

  arr[targetIndex]!.preference = newPref;
  arr[targetIndex]!.changed = true;

  return arr;
}
