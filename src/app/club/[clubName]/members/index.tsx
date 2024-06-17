import { type ClassValue } from "clsx";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { type ClubMember } from "~/types";
import { MemberSummary } from "./summary";
import { PresenceTable } from "./presence";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/ui/card";

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
        <Card>
          <CardHeader>
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
