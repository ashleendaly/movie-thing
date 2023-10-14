import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const clubName = router.pathname.startsWith("/club/")
    ? router.pathname.split("/").at(-1)
    : "";
  return (
    <div className="fixed flex w-full items-center justify-between bg-background px-5 pt-5">
      {clubName !== "" && (
        <h1 className="pl-4 text-2xl text-foreground">{clubName}</h1>
      )}
      <UserButton />
    </div>
  );
}
