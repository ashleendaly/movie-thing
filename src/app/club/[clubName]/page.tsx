import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/lib/trpc/server";
import { Aggregation } from "./aggregation";
import { ClubDetails } from "./club-details";
import { PresenceList } from "./members/presence-list";

export default async function Page({
  params: { clubName },
}: {
  params: { clubName: string };
}) {
  const members = await api.club.members.list.query({ clubName });
  const { joinCode } = await api.club.getJoinCode.query({ clubName });

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <section id="main"></section>

      <ClubDetails members={members} name={clubName} joinCode={joinCode} />
      <Tabs defaultValue="aggregation" className="">
        <TabsList>
          <TabsTrigger value="presence">Presence</TabsTrigger>
          <TabsTrigger value="aggregation">Aggregation</TabsTrigger>
        </TabsList>
        <TabsContent value="presence">
          <PresenceList clubName={clubName} members={members} />
        </TabsContent>
        <TabsContent value="aggregation">
          <Aggregation clubName={clubName} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
