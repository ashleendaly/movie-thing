import { type ClassValue } from "clsx";
import { cn } from "~/lib/utils/cn";
import { type ClubMember } from "~/types";
import { UserAvatar } from "./user-avatar";

export function MemberDetails({
  members,
  className,
}: {
  members: ClubMember[];
  className?: ClassValue;
}) {
  return (
    <div className={cn("flex flex-col gap-1 pl-1", className)}>
      <p>Members:</p>
      <ul className="flex h-10 flex-row">
        {members.map((m, i) => (
          <UserAvatar
            key={m.id}
            member={m}
            className={i !== 0 && "-translate-x-5"}
          />
        ))}
      </ul>
      <p>
        {members.filter((m) => m.isPresent).length}/{members.length} online
      </p>
    </div>
  );
}
