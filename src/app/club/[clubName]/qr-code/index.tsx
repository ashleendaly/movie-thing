import { Code } from "./code";
import { QRDrawer } from "./drawer";

export function QRCode({ joinCode }: { joinCode: string }) {
  return (
    <>
      <Code joinCode={joinCode} className="hidden lg:block" />
      <QRDrawer joinCode={joinCode} className="block lg:hidden" />
    </>
  );
}
