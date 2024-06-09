import { type Member } from "../club-details";
import { MemberList } from "./list";

export function MemberDetails({ members }: { members: Member[] }) {
  return (
    <div>
      <p>Members:</p>
      <MemberList members={members} />
      <p>
        {members.filter((m) => m.isPresent).length}/{members.length} online
      </p>
    </div>
  );
}
