import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/lib/trpc/server";
import { Aggregation } from "./aggregate";
import { ClubTitleBar } from "./club-title-bar";
import { MemberInformation } from "./members";
import { PresenceTable } from "./members/presence";
import { Code } from "./qr-code/code";

export default async function Page({
  params: { clubName },
}: {
  params: { clubName: string };
}) {
  const members = await api.club.members.list.query({ clubName });
  const { joinCode } = await api.club.getJoinCode.query({ clubName });

  return (
    <div className="grid grid-cols-12 gap-8 pt-5">
      <section
        id="main"
        className="col-span-12 col-start-1 px-5 lg:col-span-8 lg:col-start-3 lg:px-0"
      >
        {/* don't ask questions */}
        <ScrollArea className="h-[calc(100dvh-9rem+4px)]">
          <div className="flex flex-col gap-5">
            <ClubTitleBar name={clubName} joinCode={joinCode} />
            <MemberInformation
              clubName={clubName}
              members={members}
              className="hidden lg:block"
            />
            <Tabs defaultValue="aggregation" className="block lg:hidden">
              <TabsList className="mb-5">
                <TabsTrigger value="presence">Presence</TabsTrigger>
                <TabsTrigger value="aggregation">Aggregation</TabsTrigger>
              </TabsList>
              <TabsContent value="presence">
                <PresenceTable clubName={clubName} members={members} />
              </TabsContent>
              <TabsContent value="aggregation">
                <Aggregation clubName={clubName} />
              </TabsContent>
            </Tabs>
            <Aggregation clubName={clubName} className="hidden lg:block" />
          </div>
        </ScrollArea>
      </section>
      <section
        id="sidebar"
        className="col-span-2 flex items-start justify-center"
      >
        <Code joinCode={joinCode} className="fixed hidden lg:block" />
      </section>
    </div>
  );
}
