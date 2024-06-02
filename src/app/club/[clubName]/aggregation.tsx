"use client";

import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { MovieListing } from "~/components/movie-listing";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";
import { cn } from "~/lib/utils/cn";

export function Aggregation({ clubName }: { clubName: string }) {
  const { data: recs, status } = api.club.aggregate.getRankings.useQuery({
    clubName,
  });

  const utils = api.useUtils();

  const { mutateAsync: aggregate, status: aggregateStatus } =
    api.club.aggregate.computeRankings.useMutation({
      onSuccess: () =>
        utils.club.aggregate.getRankings.invalidate({ clubName }),
    });

  if (status === "error") return <h1>something went wrong...</h1>;
  if (status === "loading") return <p>loading...</p>;

  return (
    <div className="flex w-full flex-col items-center space-y-7 px-4">
      <Button
        className="flex w-full items-center gap-2"
        size="lg"
        variant="accent"
        onClick={() =>
          toast.promise(aggregate({ clubName }), {
            loading: "loading",
            success: "Computed new ranks",
            error: "Something went wrong",
          })
        }
      >
        <div
          className={cn(
            aggregateStatus === "loading" && "animate-spin direction-reverse",
          )}
        >
          <RefreshCcw />
        </div>
        Aggregate
      </Button>
      <ul className="flex w-full flex-col items-center gap-6">
        {recs.map((e) => (
          <MovieListing key={e.imdbID} movie={e} />
        ))}
      </ul>
    </div>
  );
}
