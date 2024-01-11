"use client";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { JoinClub } from "./join-club";
import { CreateClub } from "./create-club";

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
