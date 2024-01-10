import { Clapperboard, Home, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "~/utils/cn";

export function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <nav className="fixed bottom-0 flex h-[10dvh] w-full items-center justify-around bg-background">
      <Link href="/">
        <Home
          className={cn(
            "h-10 w-10 stroke-foreground",
            path === "/" && "stroke-primary",
          )}
        />
      </Link>
      <Link href="/watchlist/add">
        <Plus
          className={cn(
            "h-10 w-10 stroke-foreground",
            path === "/watchlist/add" && "stroke-primary",
          )}
        />
      </Link>
      <Link href="/watchlist">
        <Clapperboard
          className={cn(
            "h-10 w-10 stroke-foreground",
            path === "/watchlist" && "stroke-primary",
          )}
        />
      </Link>
    </nav>
  );
}
