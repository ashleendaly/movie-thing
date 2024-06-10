"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { pusherClient } from "~/lib/pusher";

export function ReloadClub({ clubName }: { clubName: string }) {
  const router = useRouter();

  useEffect(() => {
    const channel = pusherClient.subscribe(clubName);

    channel.bind("reload", () => {
      console.log("reloaded");
      router.refresh();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [clubName, router]);

  return <></>;
}
