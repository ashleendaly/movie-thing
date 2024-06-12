"use client";
import { useState } from "react";
import { Tooltip } from "~/components/ui/tooltip";
import { type ClassValue } from "clsx";
import { cn } from "~/lib/utils/cn";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: ClassValue;
}) {
  const [recent, setRecent] = useState(false);

  return (
    <Tooltip
      tip={recent ? "Copied!" : "Copy?"}
      delay={100}
      open={recent || undefined}
    >
      <button
        className={cn(className)}
        disabled={recent}
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setRecent(true);

          setTimeout(() => {
            setRecent(false);
          }, 3000);
        }}
      >
        {text}
      </button>
    </Tooltip>
  );
}
