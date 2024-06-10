import { type Member } from "../club-details";
import { PresenceToggle } from "./presence-toggle";

export function PresenceList({
  members,
  clubName,
}: {
  members: Member[];
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
