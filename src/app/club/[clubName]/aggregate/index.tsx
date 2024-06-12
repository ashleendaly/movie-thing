import { MovieListing } from "~/components/movie-listing";
import { api } from "~/lib/trpc/server";

import { AggregateButton } from "./aggregate-button";

export async function Aggregation({ clubName }: { clubName: string }) {
  const recs = await api.club.aggregate.getRankings.query({
    clubName,
  });

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <AggregateButton clubName={clubName} />
      <ul className="flex w-full flex-col items-center gap-7 lg:grid lg:grid-cols-4 lg:place-items-center">
        {recs.map((e) => (
          <MovieListing key={e.imdbID} movie={e} />
        ))}
      </ul>
    </div>
  );
}
