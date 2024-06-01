import { api } from "~/lib/trpc/server";
import { Aggregation } from "./aggregation";
import { ClubDetails } from "./club-details";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const members = await api.club.members.list.query({ clubName: name });

  return (
    <div className="flex w-full flex-col gap-2">
      <ClubDetails members={members} name={name} joinCode="name" />
      <Aggregation clubName={name} />
      <div>members</div>
    </div>
  );
}
