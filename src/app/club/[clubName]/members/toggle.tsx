"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "~/components/ui/switch";
import { api } from "~/lib/trpc/react";

export function Toggle({
  userID,
  initial,
  clubName,
}: {
  userID: string;
  initial: boolean;
  clubName: string;
}) {
  const { mutateAsync: setPresence } =
    api.club.members.setPresence.useMutation();

  const router = useRouter();

  return (
    <Switch
      checked={initial}
      onCheckedChange={async (isPresent) => {
        toast.promise(
          setPresence({
            userID,
            isPresent,
            clubName,
          }).then(() => router.refresh()), //todo this should really be after the toast

          // I have that working in jget but it doesnt seem to here...
          { success: "Updated", loading: "Loading...", error: "Error!" },
        );
      }}
    />
  );
}
