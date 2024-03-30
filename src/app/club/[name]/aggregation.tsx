"use client";

import { toast } from "sonner";
import { MovieListing } from "~/components/movie-listing";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";

export function Aggregation({ clubName }: { clubName: string }) {
  const { data: recs, status } = api.club.aggregate.getRankings.useQuery({
    clubName,
  });

  const utils = api.useUtils();

  const { mutateAsync: aggregate } =
    api.club.aggregate.computeRankings.useMutation({
      onSuccess: () =>
        utils.club.aggregate.getRankings.invalidate({ clubName }),
    });

  if (status === "error") return <h1>something went wrong...</h1>;
  if (status === "loading") return <p>loading...</p>;

  return (
    <div>
      <Button
        onClick={() =>
          toast.promise(aggregate({ clubName }), {
            loading: "loading",
            success: "Computed new ranks",
            error: "Something went wrong",
          })
        }
      >
        Aggregate
      </Button>
      <ul>
        {recs.map((e) => (
          <MovieListing key={e.imdbID} movie={e} />
        ))}
      </ul>
    </div>
  );
}
