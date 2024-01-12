"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const clubName = pathname.startsWith("/club/")
    ? pathname.split("/").at(-1)
    : "";
  return (
    <div className="fixed top-0 flex h-[10dvh] w-full items-center justify-between bg-background px-5">
      {!clubName && (
        <h1 className="pl-4 text-2xl text-foreground">{clubName}</h1>
      )}
      <UserButton />
    </div>
  );
}
