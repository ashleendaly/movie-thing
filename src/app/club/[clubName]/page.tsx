import { api } from "~/lib/trpc/server";
import { Aggregation } from "./aggregation";
import { ClubDetails } from "./club-details";
import { PresenceList } from "./members/presence-list";
import { ReloadClub } from "~/components/reload-club";

export default async function Page({
  params: { clubName },
}: {
  params: { clubName: string };
}) {
  const members = await api.club.members.list.query({ clubName });
  const { joinCode } = await api.club.getJoinCode.query({ clubName });

  return (
    <div className="flex w-full flex-col gap-2">
      <ReloadClub clubName={clubName} />
      <ClubDetails members={members} name={clubName} joinCode={joinCode} />
      <PresenceList clubName={clubName} members={members} />
      <Aggregation clubName={clubName} />
      <div>members</div>
    </div>
  );
}
