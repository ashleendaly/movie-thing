import { type User } from "@clerk/nextjs/server";

import { CopyButton } from "./copy-button";
import { MemberDetails } from "./members/details";
import { QRDrawer } from "./qr-code/drawer";
import { Code } from "./qr-code/code";

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
    <div className="flex w-full flex-col p-5 pb-10">
      <div className="flex flex-row items-start justify-between gap-8">
        <div className="grid w-full columns-lg grid-cols-12 place-items-center gap-2 rounded-md bg-accent/30 px-5 py-4 text-sm lg:mt-8">
          <CopyButton
            className="col-span-10 col-start-2 w-[60dvw] justify-self-center truncate"
            text={name}
          />

          <QRDrawer joinCode={joinCode} className="block lg:hidden" />
        </div>
        <Code joinCode={joinCode} className="hidden lg:block" />
      </div>

      <MemberDetails members={members} />
    </div>
  );
}
