import { type ClubMember } from "~/types";
import { PresenceToggle } from "./presence-toggle";

export function PresenceList({
  members,
  clubName,
}: {
  members: ClubMember[];
  clubName: string;
}) {
  return (
    <ul>
      {members.map((m) => (
        <PresenceToggle key={m.user.id} clubName={clubName} member={m} />
      ))}
    </ul>
  );
}
