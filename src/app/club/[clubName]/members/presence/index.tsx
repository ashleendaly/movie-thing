"use client";
import { type ClubMember } from "~/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function PresenceTable({
  members,
  clubName,
}: {
  members: ClubMember[];
  clubName: string;
}) {
  return <DataTable columns={columns({ clubName })} data={members} />;
}
