"use client";
import { CircleDashed } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

const codeSchema = z.string().min(2);

export default function JoinClub() {
  const router = useRouter();
  const { mutateAsync: joinClubAsync } = api.club.members.join.useMutation();

  useEffect(() => {
    const result = codeSchema.safeParse(router.query.code);
    if (result.success) {
      void joinClubAsync({ joinCode: result.data }).then(({ name: clubName }) =>
        router.push(`/club/${clubName}`),
      );
    }
  }, [joinClubAsync, router]);

  return (
    <div className="grid h-[80dvh] place-items-center">
      <CircleDashed className="animate-spin-slow h-10 w-10 stroke-foreground" />
    </div>
  );
}
