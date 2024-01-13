import Image from "next/image";
import { type Movie } from "~/types/db";

export function Movie({ movie }: { movie: Movie }) {
  const MovieDisplay =
    movie.posterURL === "N/A" ? MovieWithoutPoster : MovieWithPoster;

  return <MovieDisplay movie={movie} />;
}

function MovieWithoutPoster({ movie: { imdbID, title } }: { movie: Movie }) {
  return (
    <li key={imdbID}>
      <h1>{title}</h1>
      <div className="text-slate-400">poster not found</div>
    </li>
  );
}

function MovieWithPoster({
  movie: { posterURL, imdbID, title },
}: {
  movie: Movie;
}) {
  return (
    <li key={imdbID}>
      <Image src={posterURL} alt={title} height={445} width={300} />
    </li>
  );
}
