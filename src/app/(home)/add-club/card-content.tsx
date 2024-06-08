import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreateClub } from "../create-club";
import { JoinClub } from "../join-club";

export function CardContent() {
  return (
    <Tabs className="w-4/5" defaultValue="join">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="join">join</TabsTrigger>
        <TabsTrigger value="create">create</TabsTrigger>
      </TabsList>
      <TabsContent value="join" tabIndex={-1}>
        <JoinClub />
      </TabsContent>
      <TabsContent value="create" tabIndex={-1}>
        <CreateClub />
      </TabsContent>
    </Tabs>
  );
}
