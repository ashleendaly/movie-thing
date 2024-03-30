"use client";
import { QRCodeSVG } from "qrcode.react";

export function Title({ name, joinCode }: { name: string; joinCode: string }) {
  return (
    <div className="flex w-full flex-row justify-between p-5">
      <div>
        <h1 className="text-3xl underline">{name}</h1>
        <p>3 members</p>
        <p>2 online</p>
        {/* etc, other stats */}
      </div>
      <div>
        <p className="pb-3 text-sm italic underline">Join this club:</p>
        <QRCodeSVG
          className="border-8 border-solid border-primary p-5"
          value={`https://(our-website)/join/${joinCode}`}
          bgColor="hsl(var(--background))"
          fgColor="hsl(var(--foreground))"
          size={256}
        />
      </div>
    </div>
  );
}
