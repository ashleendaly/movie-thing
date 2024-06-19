"use client";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/react";
import { cn } from "~/lib/utils/cn";

export function AggregateButton({ clubName }: { clubName: string }) {
  const router = useRouter();

  const { mutateAsync: aggregate, isLoading } =
    api.club.aggregate.computeRankings.useMutation();

  const [stuck, setStuck] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([e]) => setStuck(e!.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(container);
    return () => observer.unobserve(container);
  }, [containerRef]);

  return (
    <div className="sticky top-[-1px] w-full pt-[1px]" ref={containerRef}>
      <Button
        className={cn(
          "mx-auto mb-7 flex w-full items-center gap-2 transition-all",
          stuck && "w-11/12 shadow-md shadow-secondary",
        )}
        size="lg"
        variant="accent"
        onClick={() =>
          toast.promise(
            aggregate({ clubName }).then(() => router.refresh()),
            {
              loading: "loading",
              success: "Computed new ranks",
              error: "Something went wrong",
            },
          )
        }
      >
        <div className={cn(isLoading && "animate-spin direction-reverse")}>
          <RefreshCcw />
        </div>
        Aggregate
      </Button>
    </div>
  );
}
