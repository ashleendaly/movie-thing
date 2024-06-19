import { type ColumnDef } from "@tanstack/react-table";
import { type ClubMember } from "~/types";
import { UserAvatar } from "../user-avatar";
import { PresenceToggle } from "./toggle";

export const columns: (props: {
  clubName: string;
}) => ColumnDef<ClubMember>[] = ({ clubName }) => [
  {
    id: "Avatar",
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => <UserAvatar member={row.original} />,
  },
  {
    id: "Username",
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "Toggle",
    header: "Present",
    cell: ({ row }) => (
      <PresenceToggle clubName={clubName} member={row.original} />
    ),
  },
];
