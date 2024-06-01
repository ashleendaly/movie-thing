"use client";
import { type User } from "@clerk/nextjs/server";
import { QRCodeSVG } from "qrcode.react";
import { env } from "~/env";

type Member = {
  user: User;
  isPresent: boolean;
};

export function ClubDetails({
  name,
  members,
  joinCode,
}: {
  name: string;
  members: Member[];
  joinCode: string;
}) {
  return (
    <div className="flex w-full flex-row justify-between p-5">
      <div>
        <h1 className="text-3xl underline">{name}</h1>
        <p>{members.length} members</p>
        <p>{members.filter((m) => m.isPresent).length} online</p>
        {/* etc, other stats */}
      </div>
      <div>
        <p className="pb-3 text-sm italic underline">Join this club:</p>
        <QRCodeSVG
          className="border-8 border-solid border-primary p-5"
          value={`${env.NEXT_PUBLIC_SITE_URL}/join/${joinCode}`}
          bgColor="hsl(var(--background))"
          fgColor="hsl(var(--foreground))"
          size={256}
        />
      </div>
    </div>
  );
}
