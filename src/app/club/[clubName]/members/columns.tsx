import { type ColumnDef } from "@tanstack/react-table";
import { type ClubMember } from "~/types";
import { UserAvatar } from "./user-avatar";
import { Toggle } from "./toggle";

export const columns: (props: {
  clubName: string;
}) => ColumnDef<ClubMember>[] = ({ clubName }) => [
  {
    id: "Avatar",
    header: "User",
    cell: ({ row }) => <UserAvatar member={row.original} />,
  },
  {
    id: "Toggle",
    header: "Present",
    cell: ({ row }) => <Toggle clubName={clubName} member={row.original} />,
  },
];
