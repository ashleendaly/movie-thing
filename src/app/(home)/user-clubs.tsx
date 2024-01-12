import Link from "next/link";
import { Suspense } from "react";

import { Divider } from "~/components/divider";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/server";
import { slugify } from "~/lib/utils/slugify";

async function UserClubs() {
  const userClubs = await api.club.getAllForUser.query();

  return (
    userClubs.length !== 0 && (
      <>
        <Divider label="or" />
        <div className="flex max-h-[60dvh] flex-col gap-4 overflow-y-scroll pb-10">
          {userClubs.map((club, i) => (
            <Link
              key={i}
              href={`/club/${slugify(club.name)}`}
              className="h-14 w-full"
            >
              <Button variant="accent" size="lg" className="h-14 w-full">
                {club.name}
              </Button>
            </Link>
          ))}
        </div>
      </>
    )
  );
}

async function UserClubsLoading() {
  return (
    <Suspense fallback={<>hello</>}>
      <UserClubs />
    </Suspense>
  );
}

export { UserClubsLoading as UserClubs };
