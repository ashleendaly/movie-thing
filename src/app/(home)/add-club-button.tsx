import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { JoinClub } from "./join-club";
import { CreateClub } from "./create-club";
import { Card } from "~/components/ui/card";

export function AddClubButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-16 w-full" size="lg">
          add a club
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[70dvh]">
        <Card className="flex w-full flex-col items-center gap-3 border-x-thick border-y-thick border-primary pt-16">
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
        </Card>
      </DialogContent>
    </Dialog>
  );
}
