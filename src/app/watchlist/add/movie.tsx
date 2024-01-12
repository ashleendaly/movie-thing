import Image from "next/image";
import { type MovieResponse } from "~/lib/hooks/use-omdb";

export function Movie({ movie }: { movie: MovieResponse }) {
  const { Poster } = movie;

  const MovieDisplay = Poster === "N/A" ? MovieWithoutPoster : MovieWithPoster;

  return <MovieDisplay movie={movie} />;
}

function MovieWithoutPoster({
  movie: { imdbID, Title },
}: {
  movie: MovieResponse;
}) {
  return (
    <li key={imdbID}>
      <h1>{Title}</h1>
      <div className="text-slate-400">poster not found</div>
    </li>
  );
}

function MovieWithPoster({
  movie: { Poster, imdbID, Title },
}: {
  movie: MovieResponse;
}) {
  return (
    <li key={imdbID}>
      <Image src={Poster} alt={Title} height={445} width={300} />
    </li>
  );
}
