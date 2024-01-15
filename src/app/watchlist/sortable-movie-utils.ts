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
 * this probably does not work
 * but it captures the main idea
 */
export function computePreference(
  index: number,
  movies: MovieWithPreference[],
) {
  const current = movies[index]!;

  if (index === movies.length) return current.preference + 1;

  const next = movies[index + 1]!;

  return (current.preference + next.preference) / 2;
}
