import { type ClubMember } from "~/types";
import { Toggle } from "./toggle";
import { UserAvatar } from "./user-avatar";

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
        <div key={m.user.id} className="flex flex-row items-center gap-2 p-2">
          <UserAvatar member={m} />
          <Toggle
            clubName={clubName}
            initial={m.isPresent}
            userID={m.user.id}
          />
        </div>
      ))}
    </ul>
  );
}
