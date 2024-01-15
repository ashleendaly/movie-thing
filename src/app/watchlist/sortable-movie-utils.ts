import { type UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type MovieWithPreference } from "~/types";

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
export function computePreference(
  activeID: UniqueIdentifier,
  overID: UniqueIdentifier,
  movies: MovieWithPreference[],
) {
  const sortedMovies = movies.slice().sort(sortMovies);

  const oldIndex = sortedMovies.findIndex((movie) => movie.imdbID === activeID);
  const newIndex = sortedMovies.findIndex((movie) => movie.imdbID === overID);

  const arr = arrayMove(sortedMovies, oldIndex, newIndex);

  const targetIndex = arr.findIndex((movie) => movie.imdbID === activeID);

  if (targetIndex === 0) {
    return Math.min(...arr.map((e) => e.preference)) - 1;
  }

  if (targetIndex === arr.length - 1) {
    return Math.max(...arr.map((e) => e.preference)) + 1;
  }

  return (
    (arr[targetIndex - 1]!.preference + arr[targetIndex + 1]!.preference) / 2
  );
}
