import { type UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type SortableMovieList, type MovieWithPreference } from "~/types";

// * NB this may be backwards
/***
 * sorts two movies by their preference
 * @usage `sortedMovies = movies.sort(sortMovies)`
 */
export function sortMovies(a: MovieWithPreference, b: MovieWithPreference) {
  return a.preference - b.preference;
}

/***
 * ? assume there are at least 2 elements in movies
 */
export function computeNewArr(
  activeID: UniqueIdentifier,
  overID: UniqueIdentifier,
  movies: SortableMovieList,
): SortableMovieList {
  const oldIndex = movies.findIndex((movie) => movie.imdbID === activeID);
  const newIndex = movies.findIndex((movie) => movie.imdbID === overID);

  const arr = arrayMove(movies, oldIndex, newIndex);

  const targetIndex = arr.findIndex((movie) => movie.imdbID === activeID);

  console.log(arr.map((e) => e.preference));

  const prevPref =
    arr[targetIndex - 1]?.preference ??
    Math.min(...arr.map((e) => e.preference)) - 1;
  const nextPref =
    arr[targetIndex + 1]?.preference ??
    Math.max(...arr.map((e) => e.preference)) + 1;

  const newPref = (prevPref + nextPref) / 2;
  // if (!prev) {
  //   newPref = Math.min(...arr.map((e) => e.preference)) - 1;
  // } else if (!next) {
  //   newPref = Math.max(...arr.map((e) => e.preference)) + 1;
  // } else {
  //   newPref = (prev.preference + next.preference) / 2;
  // }

  console.log(newPref);

  arr[targetIndex]!.preference = newPref;
  arr[targetIndex]!.changed = true;

  return arr;
}
