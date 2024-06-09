import { type User } from "@clerk/nextjs/server";

import { QRCode } from "./qr-code";

export type Member = { user: User; isPresent: boolean };

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
    <div className="w-full p-5">
      <div className="flex w-full flex-row justify-between">
        <h1 className="text-3xl underline">{name}</h1>
        <QRCode joinCode={joinCode} />
      </div>
    </div>
  );
}
