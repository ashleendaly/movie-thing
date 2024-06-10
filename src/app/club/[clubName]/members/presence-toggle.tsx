import { type Member } from "../club-details";
import { UserAvatar } from "./user-avatar";
import { Toggle } from "./toggle";

export function PresenceToggle({
  member,
  clubName,
}: {
  member: Member;
  clubName: string;
}) {
  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <UserAvatar member={member} />
      <Toggle
        clubName={clubName}
        initial={member.isPresent}
        userID={member.user.id}
      />
    </div>
  );
}
