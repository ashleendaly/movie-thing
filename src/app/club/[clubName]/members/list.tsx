import { type Member } from "../club-details";
import { UserAvatar } from "./user-avatar";

export function MemberList({ members }: { members: Member[] }) {
  return (
    <ul className="flex flex-row">
      {members.map((m, i) => (
        <UserAvatar
          key={m.user.id}
          member={m}
          className={i !== 0 && "-translate-x-3"}
        />
      ))}
    </ul>
  );
}
