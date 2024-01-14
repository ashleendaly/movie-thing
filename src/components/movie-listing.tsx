import { type ClassValue } from "clsx";
import Image from "next/image";
import { cn } from "~/lib/utils/cn";
import { type Movie } from "~/types/db";

export function MovieListing({
  movie,
  className,
}: {
  movie: Movie;
  className?: ClassValue;
}) {
  const MovieDisplay =
    movie.posterURL === "N/A" ? MovieWithoutPoster : MovieWithPoster;

  return <MovieDisplay movie={movie} className={className} />;
}

function MovieWithoutPoster({
  movie: { imdbID, title },
  className,
}: {
  movie: Movie;
  className?: ClassValue;
}) {
  return (
    <div key={imdbID} className={cn(className)}>
      <h1 className="text-foreground">{title}</h1>
      <div className="text-slate-400">poster not found</div>
    </div>
  );
}

function MovieWithPoster({
  movie: { imdbID, title, posterURL },
  className,
}: {
  movie: Movie;
  className?: ClassValue;
}) {
  return (
    <div key={imdbID} className={cn(className)}>
      <Image
        src={posterURL}
        alt={title}
        height={445}
        width={300}
        className="shadow-lg"
      />
    </div>
  );
}
