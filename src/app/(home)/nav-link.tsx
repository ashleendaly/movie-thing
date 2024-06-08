"use client";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils/cn";

export function NavLink({
  route,
  tip,
  ...rest
}: {
  children?: ReactNode;
  tip: string;
  route: string;
}) {
  const currentRoute = usePathname();

  return (
    <Tooltip tip={tip}>
      <Button
        className={cn(currentRoute === route && "bg-accent/20")}
        variant="ghost"
        size="icon"
        asChild
      >
        <Link href={route}>
          <Slot
            {...rest}
            className={cn(
              "h-10 w-10 stroke-foreground",
              currentRoute === route && "stroke-primary",
            )}
          />
        </Link>
      </Button>
    </Tooltip>
  );
}
