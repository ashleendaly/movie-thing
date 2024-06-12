import { type ReactNode } from "react";
import { ReloadClub } from "~/components/reload-club";

export default function Layout({
  children,
  params: { clubName },
}: {
  children: ReactNode;
  params: { clubName: string };
}) {
  return (
    <>
      {children}
      <ReloadClub clubName={clubName} />
    </>
  );
}
