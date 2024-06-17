"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "~/components/ui/switch";
import { api } from "~/lib/trpc/react";
import { type ClubMember } from "~/types";

export function Toggle({
  member: { id, isPresent },
  clubName,
}: {
  member: ClubMember;
  clubName: string;
}) {
  const { mutateAsync: setPresence } =
    api.club.members.setPresence.useMutation();

  const router = useRouter();

  const [optimistic, setOptimistic] = useState(isPresent);

  return (
    <Switch
      disabled={isPresent !== optimistic}
      checked={optimistic}
      onCheckedChange={async (presence) => {
        setOptimistic(!optimistic);
        toast.promise(
          setPresence({
            userID: id,
            isPresent: presence,
            clubName,
          }).then(() => router.refresh()),
          { success: "Updated", loading: "Loading...", error: "Error!" },
        );
      }}
    />
  );
}
