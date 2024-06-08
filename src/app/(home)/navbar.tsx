import { UserButton } from "@clerk/nextjs";
import { Clapperboard, Home, ListOrdered } from "lucide-react";

import { NavLink } from "./nav-link";

export function Navbar() {
  return (
    <nav className="fixed bottom-0 grid w-full grid-cols-4 place-items-center border-t-0 border-accent bg-background py-6 md:border-t-thick">
      <NavLink tip="Home" route="/">
        <Home />
      </NavLink>
      <NavLink tip="Discover" route="/watchlist/add">
        <Clapperboard />
      </NavLink>
      <NavLink tip="Watchlist" route="/watchlist">
        <ListOrdered />
      </NavLink>
      <UserButton />
    </nav>
  );
}
