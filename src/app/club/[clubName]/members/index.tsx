import { type ClassValue } from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { type ClubMember } from "~/types";
import { PresenceTable } from "./presence";
import { MemberSummary } from "./summary";

export function MemberInformation({
  members,
  clubName,
  className,
}: {
  members: ClubMember[];
  clubName: string;
  className?: ClassValue;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MemberSummary members={members} className={className} />
      </DialogTrigger>
      <DialogContent>
        <Card className="border-x-thick border-y-thick border-primary px-7 py-4">
          <CardHeader className="text-2xl text-foreground underline decoration-accent decoration-4 underline-offset-2">
            <CardTitle>Club Members</CardTitle>
          </CardHeader>
          <CardContent>
            <PresenceTable clubName={clubName} members={members} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
