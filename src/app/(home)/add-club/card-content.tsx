import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreateClub } from "./club-create";
import { JoinClub } from "./club-join";
import { Button } from "~/components/ui/button";

export function CardContent() {
  return (
    <Tabs className="w-4/5" defaultValue="join">
      <TabsList className="mb-11 grid w-full grid-cols-2">
        <TabsTrigger className="font-semibold" value="join">
          Join
        </TabsTrigger>
        <TabsTrigger className="font-semibold" value="create">
          Create
        </TabsTrigger>
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

export function Trigger() {
  return (
    <Button
      variant="muted"
      className="h-16 w-full bg-slate-800 hover:bg-slate-800/70"
      size="lg"
    >
      Add a Club
    </Button>
  );
}
