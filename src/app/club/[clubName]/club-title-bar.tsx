import { CopyButton } from "./copy-button";
import { QRDrawer } from "./qr-code/drawer";

export function ClubTitleBar({
  name,
  joinCode,
}: {
  name: string;
  joinCode: string;
}) {
  return (
    <div className="grid w-full columns-lg grid-cols-12 place-items-center gap-2 rounded-md bg-accent/30 px-5 py-4 text-sm lg:mt-8">
      <CopyButton
        className="col-span-10 col-start-2 w-[60dvw] justify-self-center truncate"
        text={name}
      />
      <QRDrawer joinCode={joinCode} className="block lg:hidden" />
    </div>
  );
}
