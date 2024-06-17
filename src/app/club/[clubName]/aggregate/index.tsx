import { MovieListing } from "~/components/movie-listing";
import { api } from "~/lib/trpc/server";
import { cn } from "~/lib/utils/cn";
import { AggregateButton } from "./aggregate-button";

export async function Aggregation({
  clubName,
  className,
}: {
  clubName: string;
  className?: string;
}) {
  const recs = await api.club.aggregate.getRankings.query({
    clubName,
  });

  return (
    <div className={cn("flex w-full flex-col items-center gap-7", className)}>
      <AggregateButton clubName={clubName} />
      <ul className="flex w-full flex-col items-center gap-7 lg:grid lg:grid-cols-4 lg:place-items-center">
        {recs.map((e) => (
          <MovieListing key={e.imdbID} movie={e} />
        ))}
      </ul>
    </div>
  );
}
