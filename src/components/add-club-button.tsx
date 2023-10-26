import { CreateClub } from "./create-club";
import { JoinClub } from "./join-club";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AddClubButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-16 w-full" size="lg">
          add a club
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[70dvh]">
        <div className="mt-10">
          <Tabs defaultValue="join">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
